/**
 * GentCoDesign - HTTP API Server
 * RESTful API for agents to generate and manage designs
 */

const express = require('express');
const cors = require('cors');
const config = require('../core/config');
const engine = require('../core/engine');
const exportPipeline = require('../export/pipeline');
const workspaceManager = require('../workspace/manager');
const skillsEngine = require('../skills/engine');
const modelRouter = require('../core/model-router');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ============ DESIGN GENERATION ============

/**
 * POST /api/generate
 * Generate a new design from prompt
 */
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, model, skills, theme, style, responsive, format } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });

    // Streaming support
    if (req.headers.accept === 'text/event-stream') {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const result = await engine.generate({
        prompt, model, skills, theme, style, responsive,
        onProgress: (msg) => res.write(`data: ${JSON.stringify({ type: 'progress', message: msg })}\n\n`),
        onToken: (token) => res.write(`data: ${JSON.stringify({ type: 'token', content: token })}\n\n`)
      });

      res.write(`data: ${JSON.stringify({ type: 'complete', result: { ...result, html: undefined } })}\n\n`);
      res.write(`data: [DONE]\n\n`);
      res.end();
    } else {
      const result = await engine.generate({ prompt, model, skills, theme, style, responsive });

      if (format) {
        const outPath = await exportPipeline.export({
          html: result.html, format, metadata: result
        });
        result.exportPath = outPath;
      }

      res.json({ success: true, design: result });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/iterate
 * Iterate on an existing design
 */
app.post('/api/iterate', async (req, res) => {
  try {
    const { designId, instruction, region, model } = req.body;
    if (!designId || !instruction) {
      return res.status(400).json({ error: 'designId and instruction are required' });
    }

    const result = await engine.iterate({ designId, instruction, region, model });
    res.json({ success: true, design: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/variations
 * Generate multiple variations
 */
app.post('/api/variations', async (req, res) => {
  try {
    const { prompt, count, model, skills, theme, style } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });

    const results = await engine.variations({ prompt, count: count || 3, model, skills, theme, style });
    res.json({ success: true, designs: results.map(r => ({ ...r, html: undefined })) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ DESIGN MANAGEMENT ============

/**
 * GET /api/designs
 * List saved designs
 */
app.get('/api/designs', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const designs = engine.listDesigns(limit);
  res.json({ success: true, designs });
});

/**
 * GET /api/designs/:id
 * Get a specific design
 */
app.get('/api/designs/:id', (req, res) => {
  const html = engine.getDesignHtml(req.params.id);
  if (!html) return res.status(404).json({ error: 'Design not found' });

  if (req.query.raw === 'true') {
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }

  res.json({ success: true, id: req.params.id, html });
});

/**
 * DELETE /api/designs/:id
 * Delete a design
 */
app.delete('/api/designs/:id', (req, res) => {
  const ok = engine.deleteDesign(req.params.id);
  res.json({ success: ok });
});

// ============ EXPORT ============

/**
 * POST /api/export
 * Export a design to a format
 */
app.post('/api/export', async (req, res) => {
  try {
    const { designId, format, outputPath } = req.body;
    if (!designId || !format) {
      return res.status(400).json({ error: 'designId and format are required' });
    }

    const html = engine.getDesignHtml(designId);
    if (!html) return res.status(404).json({ error: 'Design not found' });

    const designs = engine.listDesigns(500);
    const meta = designs.find(d => d.id === designId) || {};

    const outPath = await exportPipeline.export({ html, format, outputPath, metadata: { ...meta, id: designId } });
    res.json({ success: true, path: outPath, format });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/export/formats
 * List available export formats
 */
app.get('/api/export/formats', (req, res) => {
  res.json({ success: true, formats: exportPipeline.constructor.formats() });
});

// ============ WORKSPACES ============

app.post('/api/workspaces', (req, res) => {
  const { name, description, tags, model, theme, style } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const ws = workspaceManager.create(name, { description, tags, model, theme, style });
  res.json({ success: true, workspace: ws });
});

app.get('/api/workspaces', (req, res) => {
  res.json({ success: true, workspaces: workspaceManager.list() });
});

app.get('/api/workspaces/:id', (req, res) => {
  const ws = workspaceManager.get(req.params.id);
  if (!ws) return res.status(404).json({ error: 'Workspace not found' });
  res.json({ success: true, workspace: ws });
});

app.delete('/api/workspaces/:id', (req, res) => {
  const ok = workspaceManager.delete(req.params.id);
  res.json({ success: ok });
});

app.get('/api/workspaces/:id/export', async (req, res) => {
  try {
    const outPath = await workspaceManager.exportZip(req.params.id);
    res.download(outPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ SKILLS ============

app.get('/api/skills', (req, res) => {
  res.json({ success: true, skills: skillsEngine.list() });
});

app.get('/api/skills/:id', (req, res) => {
  const skill = skillsEngine.get(req.params.id);
  if (!skill) return res.status(404).json({ error: 'Skill not found' });
  res.json({ success: true, skill });
});

app.post('/api/skills/detect', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });
  const detected = skillsEngine.detectSkills(prompt);
  res.json({
    success: true,
    skills: detected.map(id => ({ id, ...skillsEngine.get(id) }))
  });
});

// ============ MODELS ============

app.get('/api/models', (req, res) => {
  res.json({ success: true, models: modelRouter.listModels() });
});

app.post('/api/models/test', async (req, res) => {
  const { provider } = req.body;
  if (!provider) return res.status(400).json({ error: 'provider is required' });
  const result = await modelRouter.testConnection(provider);
  res.json(result);
});

// ============ CONFIG ============

app.get('/api/config', (req, res) => {
  const cfg = config.load();
  // Redact API keys
  const safe = JSON.parse(JSON.stringify(cfg));
  for (const prov of Object.values(safe.models.providers)) {
    if (prov.apiKey) prov.apiKey = '***';
  }
  res.json({ success: true, config: safe });
});

app.patch('/api/config', (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'key is required' });
  config.set(key, value);
  res.json({ success: true });
});

// ============ STATS ============

app.get('/api/stats', (req, res) => {
  res.json({ success: true, stats: workspaceManager.stats() });
});

// ============ HEALTH ============

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    name: 'GentCoDesign',
    uptime: process.uptime()
  });
});

// ============ PREVIEW SERVER ============

/**
 * GET /preview/:id
 * Serve a design as a live preview
 */
app.get('/preview/:id', (req, res) => {
  const html = engine.getDesignHtml(req.params.id);
  if (!html) return res.status(404).send('Design not found');
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// ============ START ============

function startServer(port, host) {
  const cfg = config.load();
  const p = port || cfg.api.port || 3700;
  const h = host || cfg.api.host || '0.0.0.0';

  return app.listen(p, h, () => {
    console.log(`\n  🎨 GentCoDesign API Server`);
    console.log(`  ━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  🌐 http://${h}:${p}`);
    console.log(`  📋 API Docs: http://${h}:${p}/api/health`);
    console.log(`  🎯 Generate: POST http://${h}:${p}/api/generate`);
    console.log(`  📦 Export:   POST http://${h}:${p}/api/export`);
    console.log(`  🏠 Preview:  GET  http://${h}:${p}/preview/:id\n`);
  });
}

module.exports = { app, startServer };
