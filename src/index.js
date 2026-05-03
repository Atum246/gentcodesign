/**
 * GentCoDesign - Main Entry Point
 * Agent-native AI design engine
 *
 * Usage as library:
 *   const gcd = require('gentcodesign');
 *   const design = await gcd.generate({ prompt: 'landing page' });
 *
 * Usage as CLI:
 *   gentcodesign generate "landing page"
 *
 * Usage as API server:
 *   gentcodesign serve
 */

const engine = require('./core/engine');
const modelRouter = require('./core/model-router');
const skillsEngine = require('./skills/engine');
const exportPipeline = require('./export/pipeline');
const workspaceManager = require('./workspace/manager');
const templateEngine = require('./templates/engine');
const config = require('./core/config');

/**
 * Quick generate - one-liner for agents
 * @param {string} prompt - Design prompt
 * @param {Object} opts - Options (model, theme, style, format, skills)
 * @returns {Promise<Object>} Design result with html, id, metadata
 */
async function generate(prompt, opts = {}) {
  return engine.generate({
    prompt,
    model: opts.model || 'default',
    skills: opts.skills || [],
    theme: opts.theme || 'dark',
    style: opts.style || 'modern',
    responsive: opts.responsive !== false,
    onProgress: opts.onProgress,
    onToken: opts.onToken
  });
}

/**
 * Iterate on an existing design
 */
async function iterate(designId, instruction, opts = {}) {
  return engine.iterate({
    designId,
    instruction,
    region: opts.region,
    model: opts.model,
    onProgress: opts.onProgress,
    onToken: opts.onToken
  });
}

/**
 * Generate multiple variations
 */
async function variations(prompt, opts = {}) {
  return engine.variations({
    prompt,
    count: opts.count || 3,
    model: opts.model,
    skills: opts.skills,
    theme: opts.theme,
    style: opts.style,
    onProgress: opts.onProgress
  });
}

/**
 * Export a design
 */
async function exportDesign(html, format, opts = {}) {
  return exportPipeline.export({
    html,
    format,
    outputPath: opts.outputPath,
    metadata: opts.metadata || {}
  });
}

/**
 * List available skills
 */
function listSkills() {
  return skillsEngine.list();
}

/**
 * Detect skills from prompt
 */
function detectSkills(prompt) {
  return skillsEngine.detectSkills(prompt);
}

/**
 * List saved designs
 */
function listDesigns(limit) {
  return engine.listDesigns(limit);
}

/**
 * Get design HTML by ID
 */
function getDesign(designId) {
  return engine.getDesignHtml(designId);
}

/**
 * Start the API server
 */
function serve(port, host) {
  const { startServer } = require('./api/server');
  return startServer(port, host);
}

/**
 * Configure the engine
 */
function configure(key, value) {
  config.set(key, value);
}

/**
 * Get config
 */
function getConfig() {
  return config.load();
}

/**
 * Generate from template (instant, no API needed)
 */
function fromTemplate(templateId, opts = {}) {
  return templateEngine.generate(templateId, opts);
}

/**
 * List available templates
 */
function listTemplates() {
  return templateEngine.list();
}

/**
 * Match prompt to best template
 */
function matchTemplate(prompt) {
  return templateEngine.match(prompt);
}

module.exports = {
  // Core
  generate,
  iterate,
  variations,

  // Templates (instant)
  fromTemplate,
  listTemplates,
  matchTemplate,

  // Export
  export: exportDesign,

  // Skills
  listSkills,
  detectSkills,

  // Designs
  listDesigns,
  getDesign,

  // Server
  serve,

  // Config
  configure,
  getConfig,

  // Sub-modules
  engine,
  modelRouter,
  skillsEngine,
  exportPipeline,
  workspaceManager,
  templateEngine,
  config
};
