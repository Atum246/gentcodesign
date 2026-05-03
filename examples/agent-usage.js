/**
 * GentCoDesign - Agent Usage Examples
 * Shows how AI agents can use GentCoDesign as a library
 */

// ═══════════════════════════════════════════════════════════
// 🤖 Example 1: OpenClaw Agent Integration
// ═══════════════════════════════════════════════════════════

async function openclawExample() {
  const gcd = require('../src/index');

  // Agent receives: "Make me a pricing page for my SaaS"

  // Step 1: Generate
  const design = await gcd.generate('modern pricing page for SaaS with 3 tiers', {
    model: 'default',     // Uses whatever's configured
    theme: 'dark',
    style: 'modern'
  });

  // Step 2: Save HTML to workspace for user to preview
  const fs = require('fs');
  fs.writeFileSync(`./output/${design.id}.html`, design.html);

  // Step 3: Respond to user
  console.log(`Here's your pricing page! Design ID: ${design.id}`);
  console.log(`Preview: http://localhost:3700/preview/${design.id}`);

  return design;
}

// ═══════════════════════════════════════════════════════════
// 🔄 Example 2: Iterative Design
// ═══════════════════════════════════════════════════════════

async function iterativeExample() {
  const gcd = require('../src/index');

  // First generation
  let design = await gcd.generate('landing page for AI startup');

  // User says: "Make the header blue"
  design = await gcd.iterate(design.id, 'Change the header background to a blue gradient');

  // User says: "Add a testimonials section"
  design = await gcd.iterate(design.id, 'Add a testimonials section with 3 customer quotes');

  // User says: "Export as PDF"
  const pdfPath = await gcd.export(design.html, 'pdf', { metadata: design });
  console.log(`PDF exported: ${pdfPath}`);
}

// ═══════════════════════════════════════════════════════════
// 🎨 Example 3: Generate Variations
// ═══════════════════════════════════════════════════════════

async function variationsExample() {
  const gcd = require('../src/index');

  // Generate 3 different styles
  const designs = await gcd.variations('dashboard for analytics platform', {
    count: 3,
    model: 'openai/gpt-4o'
  });

  // Present all 3 to user
  for (const d of designs) {
    console.log(`Style: ${d.style}, Theme: ${d.theme}`);
    console.log(`Preview: ${d.id}`);
  }
}

// ═══════════════════════════════════════════════════════════
// 📦 Example 4: Batch Export
// ═══════════════════════════════════════════════════════════

async function batchExportExample() {
  const gcd = require('../src/index');

  const design = await gcd.generate('invoice template for freelance work');

  // Export to all formats
  const formats = ['html', 'pdf', 'pptx', 'zip', 'md'];
  for (const fmt of formats) {
    const path = await gcd.export(design.html, fmt, { metadata: design });
    console.log(`Exported ${fmt}: ${path}`);
  }
}

// ═══════════════════════════════════════════════════════════
// 🌐 Example 5: API Server for Multiple Agents
// ═══════════════════════════════════════════════════════════

async function serverExample() {
  // Start the API server
  const gcd = require('../src/index');
  gcd.serve(3700);

  // Now any agent can call:
  // POST http://localhost:3700/api/generate
  // POST http://localhost:3700/api/iterate
  // POST http://localhost:3700/api/export
  // GET  http://localhost:3700/api/designs
  // GET  http://localhost:3700/preview/:id
}

// ═══════════════════════════════════════════════════════════
// 🎯 Example 6: Skill-Aware Generation
// ═══════════════════════════════════════════════════════════

async function skillAwareExample() {
  const gcd = require('../src/index');

  // Auto-detect what skills a prompt needs
  const skills = gcd.detectSkills('I need a mobile app mockup for a fitness tracker');
  console.log('Detected skills:', skills); // ['mobile_app']

  // Force specific skills
  const design = await gcd.generate('admin panel for e-commerce', {
    skills: ['dashboard', 'data_table', 'ecommerce']
  });
}

// ═══════════════════════════════════════════════════════════
// 🏠 Example 7: Workspace Organization
// ═══════════════════════════════════════════════════════════

async function workspaceExample() {
  const gcd = require('../src/index');

  // Create project workspace
  gcd.workspaceManager.create('my-saas-app', {
    description: 'SaaS application UI designs',
    tags: ['saas', 'dashboard', 'landing']
  });

  // Generate and save to workspace
  const design = await gcd.generate('SaaS dashboard');
  gcd.workspaceManager.addDesign('my-saas-app', design);

  // List workspace designs
  const ws = gcd.workspaceManager.get('my-saas-app');
  console.log(`Workspace has ${ws.designs.length} designs`);

  // Search across all workspaces
  const results = gcd.workspaceManager.search('dashboard');
  console.log(`Found ${results.length} dashboard designs`);
}

// ═══════════════════════════════════════════════════════════
// Run examples
// ═══════════════════════════════════════════════════════════

if (require.main === module) {
  const example = process.argv[2] || 'openclaw';
  const examples = {
    openclaw: openclawExample,
    iterative: iterativeExample,
    variations: variationsExample,
    batch: batchExportExample,
    server: serverExample,
    skills: skillAwareExample,
    workspace: workspaceExample
  };

  const fn = examples[example];
  if (!fn) {
    console.log('Available examples:', Object.keys(examples).join(', '));
    process.exit(1);
  }

  fn().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

module.exports = {
  openclawExample,
  iterativeExample,
  variationsExample,
  batchExportExample,
  serverExample,
  skillAwareExample,
  workspaceExample
};
