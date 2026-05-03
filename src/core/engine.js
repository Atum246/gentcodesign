/**
 * GentCoDesign - Design Engine (Core Orchestrator)
 * The brain: takes prompts, routes to models, applies skills, generates designs
 */

const { v4: uuidv4 } = require('uuid');
const modelRouter = require('./model-router');
const skillsEngine = require('../skills/engine');
const config = require('./config');
const path = require('path');
const fs = require('fs');

class DesignEngine {
  constructor() {
    this.activeSessions = new Map();
  }

  /**
   * Generate a design from a prompt
   * @param {Object} opts
   * @param {string} opts.prompt - User's design prompt
   * @param {string} opts.model - Model spec (provider/model or default)
   * @param {string[]} opts.skills - Skill IDs (auto-detected if empty)
   * @param {string} opts.theme - 'light' | 'dark'
   * @param {string} opts.style - 'modern' | 'minimal' | 'bold' | 'elegant'
   * @param {string} opts.format - Output format
   * @param {boolean} opts.responsive - Enable responsive design
   * @param {Function} opts.onProgress - Progress callback
   * @param {Function} opts.onToken - Streaming token callback
   * @returns {Promise<DesignResult>}
   */
  async generate(opts) {
    const {
      prompt,
      model = 'default',
      skills = [],
      theme = 'dark',
      style = 'modern',
      responsive = true,
      onProgress,
      onToken
    } = opts;

    const designId = uuidv4();
    const startTime = Date.now();

    onProgress?.('🎯 Analyzing prompt and selecting design skills...');

    // Auto-detect skills if not specified
    const selectedSkills = skills.length > 0
      ? skills
      : skillsEngine.detectSkills(prompt);

    onProgress?.(`🎨 Selected skills: ${selectedSkills.map(s => skillsEngine.get(s)?.icon + ' ' + skillsEngine.get(s)?.name).join(', ')}`);

    // Build system prompt
    const systemPrompt = skillsEngine.buildSystemPrompt(selectedSkills, { theme, style, responsive });

    // Resolve model
    const resolved = config.resolveModel(model);
    onProgress?.(`🤖 Using model: ${resolved.provider}/${resolved.model}`);

    // Build messages
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: this._buildUserPrompt(prompt, selectedSkills, { theme, style, responsive }) }
    ];

    onProgress?.('⚡ Generating design...');

    // Generate
    let html = '';
    try {
      html = await modelRouter.complete({
        provider: resolved.provider,
        model: resolved.model,
        messages,
        maxTokens: 16000,
        temperature: 0.7,
        onToken
      });
    } catch (err) {
      throw new Error(`Model generation failed: ${err.message}`);
    }

    // Clean up the output
    html = this._cleanHtml(html);

    onProgress?.('✅ Design generated!');

    const result = {
      id: designId,
      prompt,
      html,
      skills: selectedSkills,
      model: `${resolved.provider}/${resolved.model}`,
      theme,
      style,
      responsive,
      createdAt: new Date().toISOString(),
      duration: Date.now() - startTime,
      tokens: this._estimateTokens(html)
    };

    // Save to workspace
    this._saveDesign(result);

    return result;
  }

  /**
   * Iterate on an existing design
   * @param {Object} opts
   * @param {string} opts.designId - ID of existing design
   * @param {string} opts.instruction - What to change
   * @param {Object} opts.region - Optional: specific element to modify
   * @param {Function} opts.onToken - Streaming callback
   * @returns {Promise<DesignResult>}
   */
  async iterate(opts) {
    const { designId, instruction, region, model, onToken, onProgress } = opts;

    const existing = this._loadDesign(designId);
    if (!existing) throw new Error(`Design not found: ${designId}`);

    onProgress?.('🔄 Iterating on design...');

    const resolved = config.resolveModel(model || 'default');

    const messages = [
      {
        role: 'system',
        content: `You are GentCoDesign, an elite AI design engine. You are iterating on an existing design.
The user will provide their current HTML and an instruction for changes.
Output the COMPLETE updated HTML file with the requested changes applied.
Keep all existing functionality intact. Only modify what was requested.
Output ONLY valid HTML — no markdown, no explanation.`
      },
      {
        role: 'user',
        content: `CURRENT DESIGN:\n\`\`\`html\n${existing.html}\n\`\`\`\n\nINSTRUCTION: ${instruction}${region ? `\nFOCUS ON: ${region.selector || region.description}` : ''}`
      }
    ];

    let html = '';
    try {
      html = await modelRouter.complete({
        provider: resolved.provider,
        model: resolved.model,
        messages,
        maxTokens: 16000,
        temperature: 0.5,
        onToken
      });
    } catch (err) {
      throw new Error(`Iteration failed: ${err.message}`);
    }

    html = this._cleanHtml(html);

    const result = {
      id: uuidv4(),
      parentId: designId,
      prompt: existing.prompt,
      iteration: instruction,
      html,
      skills: existing.skills,
      model: `${resolved.provider}/${resolved.model}`,
      theme: existing.theme,
      style: existing.style,
      responsive: existing.responsive,
      createdAt: new Date().toISOString(),
      tokens: this._estimateTokens(html)
    };

    this._saveDesign(result);
    return result;
  }

  /**
   * Generate variations of a design
   */
  async variations(opts) {
    const { prompt, count = 3, model, skills, theme, style, onProgress, onToken } = opts;
    const variations = [];

    for (let i = 0; i < count; i++) {
      onProgress?.(`🎨 Generating variation ${i + 1}/${count}...`);
      const result = await this.generate({
        prompt: `${prompt}\n\nMake this variation ${i + 1}: ${
          i === 0 ? 'minimal and clean' :
          i === 1 ? 'bold and vibrant' :
          'elegant and sophisticated'
        }. Be distinctly different from a typical approach.`,
        model,
        skills,
        theme: theme || (i % 2 === 0 ? 'dark' : 'light'),
        style: style || ['minimal', 'bold', 'elegant'][i % 3],
        onProgress: () => {},
        onToken: i === 0 ? onToken : undefined // Only stream first
      });
      variations.push(result);
    }

    return variations;
  }

  _buildUserPrompt(prompt, skills, options) {
    let full = `DESIGN REQUEST:\n${prompt}\n\n`;
    full += `STYLE: ${options.style}\n`;
    full += `THEME: ${options.theme}\n`;
    full += `RESPONSIVE: ${options.responsive ? 'yes' : 'no'}\n`;
    full += `SKILLS: ${skills.map(s => skillsEngine.get(s)?.name).filter(Boolean).join(', ')}\n\n`;
    full += `Generate a complete, production-quality HTML file. Include all CSS and JS inline. Make it visually stunning with real content, animations, and interactivity.`;
    return full;
  }

  _cleanHtml(html) {
    // Remove markdown code fences if present
    html = html.replace(/^```(?:html)?\s*\n?/gm, '').replace(/\n?```\s*$/gm, '');
    // Ensure it starts with doctype or html tag
    html = html.trim();
    if (!html.startsWith('<!') && !html.startsWith('<html')) {
      const match = html.match(/<html[\s>]/i);
      if (match) {
        html = html.slice(html.indexOf(match[0]));
      } else {
        const bodyMatch = html.match(/<head[\s>]|<body[\s>]/i);
        if (bodyMatch) {
          html = `<!DOCTYPE html>\n${html.slice(html.indexOf(bodyMatch[0]))}`;
        }
      }
    }
    return html;
  }

  _estimateTokens(text) {
    return Math.ceil(text.length / 4);
  }

  _saveDesign(result) {
    try {
      const workspace = this._getWorkspace();
      const designsFile = path.join(workspace, 'designs.json');
      let designs = [];
      if (fs.existsSync(designsFile)) {
        designs = JSON.parse(fs.readFileSync(designsFile, 'utf-8'));
      }
      designs.unshift({
        id: result.id,
        parentId: result.parentId,
        prompt: result.prompt,
        iteration: result.iteration,
        skills: result.skills,
        model: result.model,
        theme: result.theme,
        style: result.style,
        createdAt: result.createdAt,
        tokens: result.tokens
      });
      // Keep last 500 designs metadata
      if (designs.length > 500) designs = designs.slice(0, 500);
      fs.writeFileSync(designsFile, JSON.stringify(designs, null, 2));

      // Save HTML file
      const htmlDir = path.join(workspace, 'html');
      if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir, { recursive: true });
      fs.writeFileSync(path.join(htmlDir, `${result.id}.html`), result.html);
    } catch (e) {
      // Silent fail for save errors
    }
  }

  _loadDesign(designId) {
    try {
      const workspace = this._getWorkspace();
      const htmlFile = path.join(workspace, 'html', `${designId}.html`);
      if (!fs.existsSync(htmlFile)) return null;
      const designsFile = path.join(workspace, 'designs.json');
      let meta = {};
      if (fs.existsSync(designsFile)) {
        const designs = JSON.parse(fs.readFileSync(designsFile, 'utf-8'));
        meta = designs.find(d => d.id === designId) || {};
      }
      return { ...meta, html: fs.readFileSync(htmlFile, 'utf-8') };
    } catch (e) {
      return null;
    }
  }

  _getWorkspace() {
    const wsDir = config.paths().workspaces;
    if (!fs.existsSync(wsDir)) fs.mkdirSync(wsDir, { recursive: true });
    return wsDir;
  }

  /**
   * List saved designs
   */
  listDesigns(limit = 20) {
    try {
      const designsFile = path.join(this._getWorkspace(), 'designs.json');
      if (!fs.existsSync(designsFile)) return [];
      const designs = JSON.parse(fs.readFileSync(designsFile, 'utf-8'));
      return designs.slice(0, limit);
    } catch (e) {
      return [];
    }
  }

  /**
   * Get design HTML
   */
  getDesignHtml(designId) {
    const d = this._loadDesign(designId);
    return d ? d.html : null;
  }

  /**
   * Delete a design
   */
  deleteDesign(designId) {
    try {
      const workspace = this._getWorkspace();
      const htmlFile = path.join(workspace, 'html', `${designId}.html`);
      if (fs.existsSync(htmlFile)) fs.unlinkSync(htmlFile);

      const designsFile = path.join(workspace, 'designs.json');
      if (fs.existsSync(designsFile)) {
        let designs = JSON.parse(fs.readFileSync(designsFile, 'utf-8'));
        designs = designs.filter(d => d.id !== designId);
        fs.writeFileSync(designsFile, JSON.stringify(designs, null, 2));
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = new DesignEngine();
module.exports.DesignEngine = DesignEngine;
