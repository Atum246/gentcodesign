/**
 * GentCoDesign - Workspace Manager
 * Manages design sessions, history, and workspace state
 */

const fs = require('fs');
const path = require('path');
const config = require('../core/config');

class WorkspaceManager {
  constructor() {
    this.workspacesDir = config.paths().workspaces;
    this._ensureDir(this.workspacesDir);
  }

  _ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  /**
   * Create a new workspace
   */
  create(name, options = {}) {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const wsDir = path.join(this.workspacesDir, id);
    this._ensureDir(wsDir);
    this._ensureDir(path.join(wsDir, 'html'));
    this._ensureDir(path.join(wsDir, 'exports'));
    this._ensureDir(path.join(wsDir, 'assets'));

    const meta = {
      id,
      name,
      description: options.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designCount: 0,
      tags: options.tags || [],
      defaultModel: options.model || 'default',
      defaultTheme: options.theme || 'dark',
      defaultStyle: options.style || 'modern'
    };

    fs.writeFileSync(path.join(wsDir, 'workspace.json'), JSON.stringify(meta, null, 2));
    fs.writeFileSync(path.join(wsDir, 'designs.json'), '[]');

    return meta;
  }

  /**
   * List all workspaces
   */
  list() {
    const dirs = fs.readdirSync(this.workspacesDir).filter(d => {
      const stat = fs.statSync(path.join(this.workspacesDir, d));
      return stat.isDirectory();
    });

    return dirs.map(d => {
      try {
        const meta = JSON.parse(fs.readFileSync(path.join(this.workspacesDir, d, 'workspace.json'), 'utf-8'));
        return meta;
      } catch (e) {
        return { id: d, name: d, createdAt: 'unknown' };
      }
    });
  }

  /**
   * Get workspace by ID
   */
  get(id) {
    const wsDir = path.join(this.workspacesDir, id);
    if (!fs.existsSync(wsDir)) return null;

    try {
      const meta = JSON.parse(fs.readFileSync(path.join(wsDir, 'workspace.json'), 'utf-8'));
      const designs = JSON.parse(fs.readFileSync(path.join(wsDir, 'designs.json'), 'utf-8'));
      return { ...meta, designs };
    } catch (e) {
      return null;
    }
  }

  /**
   * Add design to workspace
   */
  addDesign(wsId, design) {
    const wsDir = path.join(this.workspacesDir, wsId);
    if (!fs.existsSync(wsDir)) return false;

    // Save HTML
    const htmlDir = path.join(wsDir, 'html');
    this._ensureDir(htmlDir);
    fs.writeFileSync(path.join(htmlDir, `${design.id}.html`), design.html);

    // Update designs list
    const designsFile = path.join(wsDir, 'designs.json');
    let designs = [];
    try { designs = JSON.parse(fs.readFileSync(designsFile, 'utf-8')); } catch (e) {}
    designs.unshift({
      id: design.id,
      prompt: design.prompt,
      skills: design.skills,
      model: design.model,
      theme: design.theme,
      style: design.style,
      createdAt: design.createdAt,
      tokens: design.tokens
    });
    fs.writeFileSync(designsFile, JSON.stringify(designs, null, 2));

    // Update workspace meta
    const metaFile = path.join(wsDir, 'workspace.json');
    const meta = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
    meta.designCount = designs.length;
    meta.updatedAt = new Date().toISOString();
    fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));

    return true;
  }

  /**
   * Delete workspace
   */
  delete(id) {
    const wsDir = path.join(this.workspacesDir, id);
    if (!fs.existsSync(wsDir)) return false;
    fs.rmSync(wsDir, { recursive: true, force: true });
    return true;
  }

  /**
   * Export workspace as ZIP
   */
  async exportZip(id) {
    const ws = this.get(id);
    if (!ws) throw new Error(`Workspace not found: ${id}`);

    const archiver = require('archiver');
    const outPath = path.join(config.paths().exports, `${id}-workspace.zip`);
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
      output.on('close', () => resolve(outPath));
      archive.on('error', reject);
      archive.pipe(output);

      // Add all HTML files
      const htmlDir = path.join(this.workspacesDir, id, 'html');
      if (fs.existsSync(htmlDir)) {
        const files = fs.readdirSync(htmlDir);
        for (const file of files) {
          archive.file(path.join(htmlDir, file), { name: `designs/${file}` });
        }
      }

      // Add metadata
      archive.append(JSON.stringify(ws, null, 2), { name: 'workspace.json' });
      archive.finalize();
    });
  }

  /**
   * Search designs across workspaces
   */
  search(query) {
    const lower = query.toLowerCase();
    const results = [];

    for (const ws of this.list()) {
      const full = this.get(ws.id);
      if (!full) continue;

      for (const design of full.designs || []) {
        if (
          (design.prompt || '').toLowerCase().includes(lower) ||
          (design.skills || []).some(s => s.toLowerCase().includes(lower))
        ) {
          results.push({ ...design, workspace: ws.id });
        }
      }
    }

    return results;
  }

  /**
   * Get workspace statistics
   */
  stats() {
    const workspaces = this.list();
    let totalDesigns = 0;
    let totalTokens = 0;

    for (const ws of workspaces) {
      const full = this.get(ws.id);
      if (!full) continue;
      totalDesigns += (full.designs || []).length;
      for (const d of full.designs || []) {
        totalTokens += d.tokens || 0;
      }
    }

    return {
      workspaces: workspaces.length,
      designs: totalDesigns,
      tokens: totalTokens,
      configPath: config.paths().config,
      dbPath: config.paths().db
    };
  }
}

module.exports = new WorkspaceManager();
module.exports.WorkspaceManager = WorkspaceManager;
