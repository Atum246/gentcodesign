#!/usr/bin/env node

/**
 * GentCoDesign - CLI
 * Agent-native AI design engine
 *
 * Commands:
 *   generate <prompt>     Generate a design from prompt
 *   iterate <id> <text>   Iterate on an existing design
 *   export <id> <format>  Export design to format
 *   list                  List saved designs
 *   view <id>             View design in browser
 *   skills                List available skills
 *   workspaces            Manage workspaces
 *   models                Manage model providers
 *   config                Manage configuration
 *   serve                 Start API server
 *   diagnose              Run diagnostics
 */

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// Load GentCoDesign
const gcd = require('../src/index');

// ─── Banner ─────────────────────────────────────────────────────
function banner() {
  const pkgVersion = require('../package.json').version;
  console.log(chalk.red.bold(`
     ██████╗ ██████╗██████╗ 
    ██╔════╝██╔════╝██╔══██╗
    ██║     ██║     ██║  ██║
    ██║     ██║     ██║  ██║
    ╚██████╗╚██████╗██████╔╝
     ╚═════╝ ╚═════╝╚═════╝ 
    `) + chalk.red.bold(`    ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗
    ██╔══██╗██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
    ██║  ██║█████╗  ███████╗██║██║   ██║██╔██╗ ██║
    ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║
    ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║
    ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝`) + chalk.white.bold(`    Agent-Native AI Design Engine v${pkgVersion}\n`));
}

// ─── Generate ───────────────────────────────────────────────────
program
  .command('generate <prompt>')
  .alias('gen')
  .description('🎨 Generate a design from a prompt')
  .option('-m, --model <model>', 'Model to use (provider/model or default)', 'default')
  .option('-s, --skills <skills...>', 'Design skills to apply (auto-detected if omitted)')
  .option('-t, --theme <theme>', 'Color theme (dark|light)', 'dark')
  .option('--style <style>', 'Design style (modern|minimal|bold|elegant)', 'modern')
  .option('--no-responsive', 'Disable responsive design')
  .option('-f, --format <format>', 'Export format after generation (html|pdf|pptx|zip|md|png)')
  .option('-o, --output <path>', 'Output directory for export')
  .option('-q, --quiet', 'Suppress progress output')
  .action(async (prompt, opts) => {
    if (!opts.quiet) banner();

    const spinner = !opts.quiet ? createSpinner('Initializing...') : null;

    try {
      const result = await gcd.generate(prompt, {
        model: opts.model,
        skills: opts.skills || [],
        theme: opts.theme,
        style: opts.style,
        responsive: opts.responsive,
        onProgress: opts.quiet ? undefined : (msg) => {
          if (spinner) spinner.text = msg;
        }
      });

      if (spinner) spinner.succeed(chalk.green('Design generated!'));

      // Display result info
      console.log('');
      console.log(chalk.bold('  📋 Design Details'));
      console.log(chalk.gray('  ─────────────────────────────────'));
      console.log(`  🆔 ID:      ${chalk.cyan(result.id)}`);
      console.log(`  🎯 Skills:  ${result.skills.map(s => gcd.skillsEngine.get(s)?.icon + ' ' + gcd.skillsEngine.get(s)?.name).join(', ')}`);
      console.log(`  🤖 Model:   ${result.model}`);
      console.log(`  🎨 Theme:   ${result.theme}`);
      console.log(`  ✨ Style:   ${result.style}`);
      console.log(`  📏 Tokens:  ~${result.tokens}`);
      console.log(`  ⏱️  Time:    ${result.duration}ms`);
      console.log('');

      // Export if format specified
      if (opts.format) {
        const outPath = await gcd.export(result.html, opts.format, {
          outputPath: opts.output,
          metadata: result
        });
        console.log(chalk.green(`  📦 Exported: ${outPath}`));
        console.log('');
      }

      // Always save HTML to workspace
      const defaultOut = path.join(process.cwd(), 'gentcodesign-output');
      if (!fs.existsSync(defaultOut)) fs.mkdirSync(defaultOut, { recursive: true });
      const htmlPath = path.join(defaultOut, `${result.id}.html`);
      fs.writeFileSync(htmlPath, result.html);
      console.log(chalk.green(`  💾 HTML saved: ${htmlPath}`));
      console.log(chalk.gray(`  🌐 Preview: gentcodesign view ${result.id}`));
      console.log('');

      // Output JSON for agent consumption
      if (opts.quiet || process.env.GENT_JSON) {
        console.log(JSON.stringify({ ...result, html: undefined, htmlPath }));
      }
    } catch (err) {
      if (spinner) spinner.fail(chalk.red('Generation failed'));
      console.error(chalk.red(`\n  ❌ Error: ${err.message}\n`));
      process.exit(1);
    }
  });

// ─── Iterate ────────────────────────────────────────────────────
program
  .command('iterate <designId> <instruction>')
  .alias('iter')
  .description('🔄 Iterate on an existing design')
  .option('-m, --model <model>', 'Model to use', 'default')
  .option('-q, --quiet', 'Suppress progress output')
  .action(async (designId, instruction, opts) => {
    if (!opts.quiet) banner();

    try {
      console.log(chalk.cyan(`  🔄 Iterating: "${instruction}"\n`));

      const result = await gcd.iterate(designId, instruction, {
        model: opts.model,
        onProgress: opts.quiet ? undefined : (msg) => console.log(`  ${msg}`)
      });

      console.log(chalk.green(`\n  ✅ Iteration complete! New ID: ${result.id}\n`));

      const outDir = path.join(process.cwd(), 'gentcodesign-output');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const htmlPath = path.join(outDir, `${result.id}.html`);
      fs.writeFileSync(htmlPath, result.html);
      console.log(chalk.green(`  💾 Saved: ${htmlPath}\n`));
    } catch (err) {
      console.error(chalk.red(`\n  ❌ Error: ${err.message}\n`));
      process.exit(1);
    }
  });

// ─── Variations ─────────────────────────────────────────────────
program
  .command('variations <prompt>')
  .alias('vars')
  .description('🎨 Generate multiple design variations')
  .option('-n, --count <count>', 'Number of variations', '3')
  .option('-m, --model <model>', 'Model to use', 'default')
  .option('-q, --quiet', 'Suppress progress output')
  .action(async (prompt, opts) => {
    if (!opts.quiet) banner();

    try {
      const results = await gcd.variations(prompt, {
        count: parseInt(opts.count),
        model: opts.model,
        onProgress: opts.quiet ? undefined : (msg) => console.log(`  ${msg}`)
      });

      const outDir = path.join(process.cwd(), 'gentcodesign-output');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      console.log(chalk.green(`\n  ✅ Generated ${results.length} variations!\n`));
      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const htmlPath = path.join(outDir, `variation-${i + 1}-${r.id}.html`);
        fs.writeFileSync(htmlPath, r.html);
        console.log(chalk.cyan(`  ${i + 1}. ${r.theme}/${r.style} → ${htmlPath}`));
      }
      console.log('');
    } catch (err) {
      console.error(chalk.red(`\n  ❌ Error: ${err.message}\n`));
      process.exit(1);
    }
  });

// ─── Export ─────────────────────────────────────────────────────
program
  .command('export <designId> <format>')
  .description('📦 Export a design (html|pdf|pptx|zip|md|png)')
  .option('-o, --output <path>', 'Output directory')
  .action(async (designId, format, opts) => {
    try {
      const html = gcd.getDesign(designId);
      if (!html) {
        console.error(chalk.red(`\n  ❌ Design not found: ${designId}\n`));
        process.exit(1);
      }

      const designs = gcd.listDesigns(500);
      const meta = designs.find(d => d.id === designId) || {};

      const outPath = await gcd.export(html, format, {
        outputPath: opts.output,
        metadata: { ...meta, id: designId }
      });

      console.log(chalk.green(`\n  📦 Exported: ${outPath}\n`));
    } catch (err) {
      console.error(chalk.red(`\n  ❌ Error: ${err.message}\n`));
      process.exit(1);
    }
  });

// ─── List ───────────────────────────────────────────────────────
program
  .command('list')
  .alias('ls')
  .description('📋 List saved designs')
  .option('-n, --limit <limit>', 'Max designs to show', '20')
  .action((opts) => {
    const designs = gcd.listDesigns(parseInt(opts.limit));

    if (designs.length === 0) {
      console.log(chalk.gray('\n  No designs yet. Run: gentcodesign generate "your prompt"\n'));
      return;
    }

    console.log(chalk.bold('\n  🎨 Saved Designs\n'));
    console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));

    for (const d of designs) {
      const skillIcons = (d.skills || []).map(s => gcd.skillsEngine.get(s)?.icon || '').join('');
      console.log(
        `  ${chalk.cyan(d.id.slice(0, 8))}  ${skillIcons}  ${chalk.white((d.prompt || '').slice(0, 50))}`
      );
      console.log(
        chalk.gray(`             ${d.model || '?'} · ${d.theme || '?'} · ${d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '?'}\n`)
      );
    }
  });

// ─── View ───────────────────────────────────────────────────────
program
  .command('view <designId>')
  .description('🌐 Open design in browser')
  .action(async (designId) => {
    const html = gcd.getDesign(designId);
    if (!html) {
      console.error(chalk.red(`\n  ❌ Design not found: ${designId}\n`));
      process.exit(1);
    }

    const tmpPath = path.join(require('os').tmpdir(), `gentcodesign-${designId}.html`);
    fs.writeFileSync(tmpPath, html);

    try {
      const open = require('open');
      await open(tmpPath);
      console.log(chalk.green(`\n  🌐 Opened in browser: ${tmpPath}\n`));
    } catch (e) {
      console.log(chalk.yellow(`\n  📄 HTML file: ${tmpPath}\n  Open manually in browser.\n`));
    }
  });

// ─── Skills ─────────────────────────────────────────────────────
program
  .command('skills')
  .description('🎯 List available design skills')
  .option('-d, --detect <prompt>', 'Detect skills from a prompt')
  .action((opts) => {
    if (opts.detect) {
      const detected = gcd.detectSkills(opts.detect);
      console.log(chalk.bold('\n  🎯 Detected Skills\n'));
      for (const id of detected) {
        const skill = gcd.skillsEngine.get(id);
        console.log(`  ${skill.icon}  ${chalk.cyan(id)} — ${skill.description}`);
      }
      console.log('');
      return;
    }

    const skills = gcd.listSkills();
    console.log(chalk.bold('\n  🎨 Available Design Skills\n'));
    console.log(chalk.gray('  ─────────────────────────────────────────────────────'));

    for (const skill of skills) {
      console.log(`  ${skill.icon}  ${chalk.cyan(skill.id.padEnd(16))} ${skill.name}`);
      console.log(chalk.gray(`      ${skill.description}\n`));
    }
  });

// ─── Models ─────────────────────────────────────────────────────
program
  .command('models')
  .description('🤖 Manage model providers')
  .option('--list', 'List available models')
  .option('--test <provider>', 'Test provider connection')
  .option('--set-key <pair>', 'Set API key (provider=key)')
  .action(async (opts) => {
    if (opts.setKey) {
      const [provider, ...keyParts] = opts.setKey.split('=');
      const key = keyParts.join('=');
      if (!provider || !key) {
        console.error(chalk.red('\n  ❌ Format: --set-key provider=your-api-key\n'));
        process.exit(1);
      }
      gcd.configure(`models.providers.${provider}.apiKey`, key);
      console.log(chalk.green(`\n  ✅ API key set for ${provider}\n`));
      return;
    }

    if (opts.test) {
      console.log(chalk.cyan(`\n  🔌 Testing ${opts.test}...\n`));
      const result = await gcd.modelRouter.testConnection(opts.test);
      if (result.ok) {
        console.log(chalk.green(`  ✅ Connected! Model: ${result.model}\n`));
      } else {
        console.log(chalk.red(`  ❌ Failed: ${result.error}\n`));
      }
      return;
    }

    // Default: list
    const models = gcd.modelRouter.listModels();
    console.log(chalk.bold('\n  🤖 Available Model Providers\n'));
    console.log(chalk.gray('  ─────────────────────────────────────────────────────'));

    for (const m of models) {
      console.log(`  ${chalk.cyan(m.provider.padEnd(14))} ${m.name}`);
      console.log(chalk.gray(`    Models: ${m.models.join(', ')}`));
      console.log(chalk.gray(`    Key: ${m.hasKey ? '✅ Set' : '❌ Not set'}\n`));
    }
  });

// ─── Workspaces ─────────────────────────────────────────────────
program
  .command('workspaces')
  .alias('ws')
  .description('🏠 Manage design workspaces')
  .option('--create <name>', 'Create new workspace')
  .option('--list', 'List workspaces')
  .option('--delete <id>', 'Delete workspace')
  .option('--stats', 'Show workspace statistics')
  .action((opts) => {
    if (opts.create) {
      const ws = gcd.workspaceManager.create(opts.create);
      console.log(chalk.green(`\n  ✅ Created workspace: ${ws.name} (${ws.id})\n`));
      return;
    }

    if (opts.delete) {
      const ok = gcd.workspaceManager.delete(opts.delete);
      console.log(ok
        ? chalk.green(`\n  ✅ Deleted workspace: ${opts.delete}\n`)
        : chalk.red(`\n  ❌ Workspace not found: ${opts.delete}\n`)
      );
      return;
    }

    if (opts.stats) {
      const stats = gcd.workspaceManager.stats();
      console.log(chalk.bold('\n  📊 Workspace Statistics\n'));
      console.log(`  🏠 Workspaces: ${stats.workspaces}`);
      console.log(`  🎨 Designs:    ${stats.designs}`);
      console.log(`  📏 Tokens:     ~${stats.tokens}`);
      console.log(`  📂 Config:     ${stats.configPath}\n`);
      return;
    }

    // Default: list
    const workspaces = gcd.workspaceManager.list();
    if (workspaces.length === 0) {
      console.log(chalk.gray('\n  No workspaces. Create one: gentcodesign ws --create my-project\n'));
      return;
    }

    console.log(chalk.bold('\n  🏠 Workspaces\n'));
    for (const ws of workspaces) {
      console.log(`  ${chalk.cyan(ws.id)}  ${ws.name}  (${ws.designCount || 0} designs)`);
    }
    console.log('');
  });

// ─── Config ─────────────────────────────────────────────────────
program
  .command('config')
  .description('⚙️  Manage configuration')
  .option('--show', 'Show current config')
  .option('--set <pair>', 'Set config value (key=value)')
  .option('--set-key <pair>', 'Set provider API key (provider=key)')
  .option('--reset', 'Reset to defaults')
  .action((opts) => {
    if (opts.show) {
      const cfg = gcd.getConfig();
      // Redact keys
      const safe = JSON.parse(JSON.stringify(cfg));
      for (const prov of Object.values(safe.models.providers)) {
        if (prov.apiKey) prov.apiKey = prov.apiKey.slice(0, 8) + '***';
      }
      console.log(chalk.bold('\n  ⚙️  Configuration\n'));
      console.log(JSON.stringify(safe, null, 2));
      console.log('');
      return;
    }

    if (opts.set) {
      const [key, ...valParts] = opts.set.split('=');
      const value = valParts.join('=');
      try {
        const parsed = JSON.parse(value);
        gcd.configure(key, parsed);
      } catch {
        gcd.configure(key, value);
      }
      console.log(chalk.green(`\n  ✅ Set ${key}\n`));
      return;
    }

    if (opts.setKey) {
      const [provider, ...keyParts] = opts.setKey.split('=');
      const key = keyParts.join('=');
      gcd.configure(`models.providers.${provider}.apiKey`, key);
      console.log(chalk.green(`\n  ✅ API key set for ${provider}\n`));
      return;
    }

    if (opts.reset) {
      const configPath = gcd.config.paths().config_file;
      if (fs.existsSync(configPath)) fs.unlinkSync(configPath);
      console.log(chalk.green('\n  ✅ Configuration reset to defaults\n'));
      return;
    }

    // Default: show help
    program.commands.find(c => c.name() === 'config').help();
  });

// ─── Serve ──────────────────────────────────────────────────────
program
  .command('serve')
  .description('🌐 Start the API server')
  .option('-p, --port <port>', 'Port number', '3700')
  .option('-h, --host <host>', 'Bind host', '0.0.0.0')
  .action((opts) => {
    banner();
    gcd.serve(parseInt(opts.port), opts.host);
  });

// ─── Diagnose ───────────────────────────────────────────────────
program
  .command('diagnose')
  .alias('diag')
  .description('🔧 Run system diagnostics')
  .action(async () => {
    banner();
    console.log(chalk.bold('  🔧 System Diagnostics\n'));

    // Check Node version
    const nodeVersion = process.version;
    console.log(`  Node.js:     ${chalk.cyan(nodeVersion)} ${parseInt(nodeVersion.slice(1)) >= 18 ? '✅' : '❌ (need 18+)'}`);

    // Check config
    const cfg = gcd.getConfig();
    console.log(`  Config:      ${chalk.cyan(gcd.config.paths().config_file)}`);

    // Check providers
    const models = gcd.modelRouter.listModels();
    console.log(`  Providers:   ${chalk.cyan(models.length)} configured`);

    for (const m of models) {
      const status = m.hasKey ? '✅' : '⚠️  no key';
      console.log(`    ${m.provider.padEnd(14)} ${status}`);
    }

    // Check dependencies
    console.log('');
    const deps = ['express', 'puppeteer', 'pptxgenjs', 'archiver', 'better-sqlite3', 'sharp'];
    for (const dep of deps) {
      try {
        require.resolve(dep);
        console.log(`  ${dep.padEnd(18)} ✅`);
      } catch {
        console.log(`  ${dep.padEnd(18)} ⚠️  not installed`);
      }
    }

    // Test connections
    console.log(chalk.bold('\n  🔌 Connection Tests\n'));
    for (const m of models) {
      if (m.hasKey) {
        process.stdout.write(`  ${m.provider.padEnd(14)} `);
        const result = await gcd.modelRouter.testConnection(m.provider);
        console.log(result.ok ? chalk.green('✅ Connected') : chalk.red(`❌ ${result.error}`));
      }
    }

    console.log('');
  });

// ─── Templates (Instant) ──────────────────────────────────────
program
  .command('template <name>')
  .alias('tpl')
  .description('⚡ Instant template generation (no API needed)')
  .option('-t, --theme <theme>', 'Theme (dark|light)', 'dark')
  .option('-o, --output <path>', 'Output file path')
  .option('--title <title>', 'Custom title')
  .option('--accent <color>', 'Accent color', '#6366f1')
  .action((name, opts) => {
    try {
      const templateEngine = require('../src/templates/engine');
      const templates = templateEngine.list();

      if (name === 'list' || name === 'ls') {
        console.log(chalk.bold('\n  ⚡ Available Templates (Instant)\n'));
        for (const t of templates) {
          console.log(`  ${chalk.cyan(t.id.padEnd(12))} ${t.name}`);
        }
        console.log('');
        return;
      }

      const html = templateEngine.generate(name, {
        theme: opts.theme,
        title: opts.title,
        accent: opts.accent
      });

      const outDir = path.join(process.cwd(), 'gentcodesign-output');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      const outPath = opts.output || path.join(outDir, `template-${name}-${Date.now()}.html`);
      fs.writeFileSync(outPath, html);

      console.log(chalk.green(`\n  ⚡ Template generated: ${outPath}\n`));
      console.log(chalk.gray(`  🌐 Open in browser to preview\n`));
    } catch (err) {
      console.error(chalk.red(`\n  ❌ ${err.message}\n`));
      process.exit(1);
    }
  });

// ─── Quick Generate (shorthand) ──────────────────────────────────
program
  .argument('[prompt...]', 'Quick generate (shorthand)')
  .action(async (promptParts) => {
    if (promptParts.length === 0) {
      program.help();
      return;
    }

    const prompt = promptParts.join(' ');
    banner();

    try {
      const result = await gcd.generate(prompt, {
        onProgress: (msg) => {
          process.stdout.write(`\r  ${msg.padEnd(60)}`);
        }
      });

      console.log(chalk.green(`\n  ✅ Generated! ID: ${result.id}`));

      const outDir = path.join(process.cwd(), 'gentcodesign-output');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const htmlPath = path.join(outDir, `${result.id}.html`);
      fs.writeFileSync(htmlPath, result.html);
      console.log(chalk.green(`  💾 ${htmlPath}\n`));
    } catch (err) {
      console.error(chalk.red(`\n  ❌ ${err.message}\n`));
      process.exit(1);
    }
  });

// ─── Helpers ────────────────────────────────────────────────────
function createSpinner(text) {
  const ora = require('ora');
  return ora({ text, color: 'cyan' }).start();
}

// ─── Parse & Run ────────────────────────────────────────────────
program
  .name('gentcodesign')
  .version(require('../package.json').version)
  .description('🎨 GentCoDesign — Agent-Native AI Design Engine')
  .parse(process.argv);
