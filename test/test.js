#!/usr/bin/env node

/**
 * GentCoDesign - Test Suite
 * Run: node test/test.js
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Test colors
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ${GREEN}✓${RESET} ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ${RED}✗${RESET} ${name}`);
    console.log(`    ${RED}${err.message}${RESET}`);
    failed++;
  }
}

async function asyncTest(name, fn) {
  try {
    await fn();
    console.log(`  ${GREEN}✓${RESET} ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ${RED}✗${RESET} ${name}`);
    console.log(`    ${RED}${err.message}${RESET}`);
    failed++;
  }
}

// ─── Module Imports ─────────────────────────────────────────────
console.log(`\n${CYAN}GentCoDesign Test Suite${RESET}\n`);
console.log(`${DIM}Loading modules...${RESET}\n`);

const gcd = require('../src/index');
const config = require('../src/core/config');
const skillsEngine = require('../src/skills/engine');
const exportPipeline = require('../src/export/pipeline');
const workspaceManager = require('../src/workspace/manager');

// ─── Config Tests ───────────────────────────────────────────────
console.log(`${CYAN}Configuration${RESET}`);

test('config loads defaults', () => {
  const cfg = config.load();
  assert(cfg.version);
  assert(cfg.models.providers.anthropic);
  assert(cfg.models.providers.openai);
});

test('config get/set works', () => {
  config.set('test.value', 42);
  assert.strictEqual(config.get('test.value'), 42);
});

test('config resolves model specs', () => {
  const r1 = config.resolveModel('default');
  assert(r1.provider);
  assert(r1.model);

  const r2 = config.resolveModel('openai/gpt-4o');
  assert.strictEqual(r2.provider, 'openai');
  assert.strictEqual(r2.model, 'gpt-4o');
});

test('config paths exist', () => {
  const paths = config.paths();
  assert(paths.config);
  assert(paths.workspaces);
  assert(paths.exports);
});

// ─── Skills Tests ───────────────────────────────────────────────
console.log(`\n${CYAN}Design Skills${RESET}`);

test('skills list returns all 26 skills', () => {
  const skills = skillsEngine.list();
  assert.strictEqual(skills.length, 26);
});

test('skills have required fields', () => {
  const skills = skillsEngine.list();
  for (const skill of skills) {
    assert(skill.id, `Skill missing id`);
    assert(skill.name, `Skill ${skill.id} missing name`);
    assert(skill.icon, `Skill ${skill.id} missing icon`);
    assert(skill.description, `Skill ${skill.id} missing description`);
  }
});

test('skill get returns specific skill', () => {
  const skill = skillsEngine.get('dashboard');
  assert.strictEqual(skill.name, 'Dashboard');
  assert.strictEqual(skill.icon, '📊');
});

test('skill get returns null for unknown', () => {
  const skill = skillsEngine.get('nonexistent');
  assert.strictEqual(skill, null);
});

test('skill detection works for common prompts', () => {
  assert(skillsEngine.detectSkills('landing page startup').includes('landing_page'));
  assert(skillsEngine.detectSkills('admin dashboard').includes('dashboard'));
  assert(skillsEngine.detectSkills('pricing table with tiers').includes('pricing'));
  assert(skillsEngine.detectSkills('chat messenger interface').includes('chat_ui'));
  assert(skillsEngine.detectSkills('portfolio website').includes('portfolio'));
  assert(skillsEngine.detectSkills('mobile app screens').includes('mobile_app'));
});

test('skill detection defaults to landing_page for vague prompts', () => {
  const detected = skillsEngine.detectSkills('make something cool');
  assert(detected.includes('landing_page'));
});

test('buildSystemPrompt includes global rules', () => {
  const prompt = skillsEngine.buildSystemPrompt(['dashboard'], { theme: 'dark', style: 'modern', responsive: true });
  assert(prompt.includes('GentCoDesign'));
  assert(prompt.includes('Dashboard'));
  assert(prompt.includes('dark'));
});

// ─── Export Pipeline Tests ──────────────────────────────────────
console.log(`\n${CYAN}Export Pipeline${RESET}`);

test('export formats are listed', () => {
  const ExportPipeline = require('../src/export/pipeline').constructor;
  const formats = ExportPipeline.formats();
  assert.strictEqual(formats.length, 6);
  assert(formats.find(f => f.id === 'html'));
  assert(formats.find(f => f.id === 'pdf'));
  assert(formats.find(f => f.id === 'pptx'));
  assert(formats.find(f => f.id === 'zip'));
  assert(formats.find(f => f.id === 'md'));
  assert(formats.find(f => f.id === 'png'));
});

test('HTML export works', async () => {
  const testHtml = '<html><body><h1>Test</h1></body></html>';
  const outPath = await exportPipeline.export({
    html: testHtml,
    format: 'html',
    metadata: { prompt: 'test design', id: 'test-123' }
  });
  assert(fs.existsSync(outPath));
  const content = fs.readFileSync(outPath, 'utf-8');
  assert(content.includes('GentCoDesign'));
  assert(content.includes('Test'));
  fs.unlinkSync(outPath);
});

test('Markdown export works', async () => {
  const testHtml = '<html><body><h1>Hello World</h1><p>Test content</p></body></html>';
  const outPath = await exportPipeline.export({
    html: testHtml,
    format: 'md',
    metadata: { prompt: 'test', id: 'test-456' }
  });
  assert(fs.existsSync(outPath));
  const content = fs.readFileSync(outPath, 'utf-8');
  assert(content.includes('Hello World'));
  fs.unlinkSync(outPath);
});

test('ZIP export works', async () => {
  const testHtml = '<html><body><h1>Zip Test</h1></body></html>';
  const outPath = await exportPipeline.export({
    html: testHtml,
    format: 'zip',
    metadata: { prompt: 'zip test', id: 'test-789' }
  });
  assert(fs.existsSync(outPath));
  assert(outPath.endsWith('.zip'));
  fs.unlinkSync(outPath);
});

// ─── Workspace Tests ────────────────────────────────────────────
console.log(`\n${CYAN}Workspace Manager${RESET}`);

test('workspace creation and listing', () => {
  const ws = workspaceManager.create('test-workspace', { description: 'Test' });
  assert.strictEqual(ws.name, 'test-workspace');
  assert(ws.id);

  const list = workspaceManager.list();
  assert(list.find(w => w.id === ws.id));

  // Cleanup
  workspaceManager.delete(ws.id);
});

test('workspace get returns null for unknown', () => {
  const ws = workspaceManager.get('nonexistent-workspace');
  assert.strictEqual(ws, null);
});

test('workspace stats work', () => {
  const stats = workspaceManager.stats();
  assert(typeof stats.workspaces === 'number');
  assert(typeof stats.designs === 'number');
});

// ─── Skills Engine Direct Tests ─────────────────────────────────
console.log(`\n${CYAN}Skills Engine${RESET}`);

test('all skill IDs are valid keys', () => {
  const skills = skillsEngine.list();
  for (const skill of skills) {
    const fetched = skillsEngine.get(skill.id);
    assert(fetched, `Could not get skill by id: ${skill.id}`);
    assert.strictEqual(fetched.name, skill.name);
  }
});

test('system prompt varies by theme and style', () => {
  const p1 = skillsEngine.buildSystemPrompt(['landing_page'], { theme: 'dark', style: 'modern' });
  const p2 = skillsEngine.buildSystemPrompt(['landing_page'], { theme: 'light', style: 'minimal' });
  assert(p1.includes('dark'));
  assert(p2.includes('light'));
  assert(p1.includes('modern'));
  assert(p2.includes('minimal'));
});

test('multiple skills combine in system prompt', () => {
  const prompt = skillsEngine.buildSystemPrompt(['dashboard', 'data_table', 'glassmorphism']);
  assert(prompt.includes('Dashboard'));
  assert(prompt.includes('Data Table'));
  assert(prompt.includes('Glassmorphism'));
});

// ─── Integration Tests (require API key) ────────────────────────
console.log(`\n${CYAN}Integration (API Key Required)${RESET}`);

const hasApiKey = config.getApiKey('anthropic') || config.getApiKey('openai');

if (hasApiKey) {
  asyncTest('full generate cycle works', async () => {
    const model = config.getApiKey('openai') ? 'openai/gpt-4o-mini' : 'anthropic/claude-sonnet-4-20250514';
    const result = await gcd.generate('simple contact form', {
      model,
      theme: 'dark',
      skills: ['form'],
      onProgress: () => {}
    });
    assert(result.id);
    assert(result.html);
    assert(result.html.includes('<'));
    assert(result.skills.includes('form'));
    assert(result.tokens > 0);
    console.log(`    ${DIM}Generated ${result.tokens} tokens in ${result.duration}ms${RESET}`);
  });

  asyncTest('HTML export of generated design works', async () => {
    const model = config.getApiKey('openai') ? 'openai/gpt-4o-mini' : 'anthropic/claude-sonnet-4-20250514';
    const result = await gcd.generate('error 404 page', {
      model,
      skills: ['error_page'],
      onProgress: () => {}
    });
    const outPath = await gcd.export(result.html, 'html', { metadata: result });
    assert(fs.existsSync(outPath));
    fs.unlinkSync(outPath);
  });
} else {
  console.log(`  ${DIM}⏭ Skipped (no API key configured)${RESET}`);
  console.log(`  ${DIM}  Set a key: gentcodesign config --set-key openai=sk-xxx${RESET}`);
}

// ─── Summary ────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`${GREEN}✓ ${passed} passed${RESET}${failed ? `  ${RED}✗ ${failed} failed${RESET}` : ''}`);
console.log(`${'─'.repeat(50)}\n`);

process.exit(failed > 0 ? 1 : 0);
