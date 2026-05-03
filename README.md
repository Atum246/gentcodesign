# 🎨 GentCoDesign

**Agent-Native AI Design Engine**

> Turn prompts into polished prototypes, slides, dashboards, and marketing assets — designed for AI agents like OpenClaw, Claude Code, Cursor, and more.

---

## 📋 Prerequisites

Before installing GentCoDesign, make sure you have:

| Requirement | Minimum | Check Command |
|-------------|---------|---------------|
| **Node.js** | v18.0.0 or higher | `node --version` |
| **npm** | v8.0.0 or higher | `npm --version` |
| **OS** | macOS, Windows, or Linux | — |
| **API Key** *(optional)* | Any supported provider | — |

> **Note:** Node.js includes npm. Download from https://nodejs.org if you don't have it.

### Quick Node.js Install (if needed)

```bash
# macOS (Homebrew)
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Windows
winget install OpenJS.NodeJS.LTS

# Verify
node --version   # Should show v18+ or v22+
npm --version    # Should show v8+
```

---

## ⚡ Install

```bash
npm install -g gentcodesign
```

That's it. One command. You now have two commands available globally:

- `gentcodesign` — full command
- `gcd` — short alias

### Verify Installation

```bash
gentcodesign --version
# Should show: 1.1.1

gentcodesign diagnose
# Runs system diagnostics
```

---

## 🚀 Quick Start

### Step 1: Set an API Key (pick one)

```bash
# OpenAI (GPT-4o, etc.)
gentcodesign config --set-key openai=sk-your-key-here

# Anthropic (Claude)
gentcodesign config --set-key anthropic=sk-ant-your-key-here

# Google Gemini
gentcodesign config --set-key gemini=your-key-here

# NVIDIA NIM
gentcodesign config --set-key nvidia=nvapi-your-key-here

# Groq (ultra-fast)
gentcodesign config --set-key groq=gsk-your-key-here

# OpenRouter (100+ models)
gentcodesign config --set-key openrouter=sk-or-your-key-here

# Or use local models (no key needed!)
# Just install and run Ollama: https://ollama.com
```

### Step 2: Generate a Design

```bash
gentcodesign generate "modern landing page for a coffee shop"
```

The HTML file is saved to `./gentcodesign-output/`. Open it in any browser.

### Step 3: Done! 🎉

---

## 🤖 How AI Agents Use GentCoDesign

GentCoDesign is built for AI agents. Here's exactly how it works:

### For the User (What They Need to Do)

1. **Install Node.js** (v18+) — https://nodejs.org
2. **Install GentCoDesign** — `npm install -g gentcodesign`
3. **Set an API key** — `gentcodesign config --set-key openai=sk-xxx`
4. **Tell their agent** to design something

That's it. The agent handles everything else.

### For the Agent (What It Does)

When a user says *"Make me a pricing page"*, the agent:

```
1. Calls: gentcodesign generate "pricing page" --quiet
2. Gets back: design ID, HTML file path, metadata
3. Responds to user: "Here's your pricing page! [preview link]"
```

### Agent Integration Examples

#### OpenClaw Agent
```bash
# Agent runs this command directly
gentcodesign generate "analytics dashboard" --model openai/gpt-4o --theme dark

# Or uses the library
node -e "
  const gcd = require('gentcodesign');
  gcd.generate('analytics dashboard').then(d => console.log(d.id));
"
```

#### Claude Code / Cursor / Any Agent
```bash
# The agent can run CLI commands
gentcodesign generate "SaaS landing page"
gentcodesign iterate <design-id> "make it dark mode"
gentcodesign export <design-id> pdf
```

#### Via API Server (for web-based agents)
```bash
# Start the server once
gentcodesign serve --port 3700

# Agent calls HTTP API
curl -X POST http://localhost:3700/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "pricing page"}'
```

### What the Agent Gets Back

```json
{
  "id": "abc-123-def",
  "html": "<!DOCTYPE html>...",
  "skills": ["pricing"],
  "model": "openai/gpt-4o",
  "theme": "dark",
  "tokens": 4200,
  "duration": 8500
}
```

The agent can then:
- Save the HTML to a file
- Show a preview URL
- Export to PDF/PPTX/ZIP
- Iterate on the design
- Generate variations

### Agent Workflow Diagram

```
User: "Make me a dashboard for my SaaS"
         │
         ▼
    ┌─────────────┐
    │  AI Agent    │ (OpenClaw, Claude Code, etc.)
    └──────┬──────┘
           │ runs
           ▼
    ┌─────────────────────────────────────┐
    │  gentcodesign generate "dashboard"  │
    │                                     │
    │  1. Auto-detects skill: dashboard   │
    │  2. Selects model provider          │
    │  3. Generates HTML prototype        │
    │  4. Saves to ./gentcodesign-output/ │
    └──────┬──────────────────────────────┘
           │ returns
           ▼
    ┌─────────────┐
    │  AI Agent    │ responds with preview
    └──────┬──────┘
           │
           ▼
    User: "Make the header blue"
         │
         ▼
    gentcodesign iterate <id> "change header to blue"
         │
         ▼
    Updated design saved
```

---

## 🎯 Full CLI Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `generate <prompt>` | `gen` | Generate design from prompt |
| `iterate <id> <text>` | `iter` | Modify an existing design |
| `variations <prompt>` | `vars` | Generate 3 style variations |
| `export <id> <format>` | | Export to HTML/PDF/PPTX/ZIP/MD/PNG |
| `template <name>` | `tpl` | Instant template (no API key needed) |
| `list` | `ls` | List saved designs |
| `view <id>` | | Open in browser |
| `skills` | | List design skills |
| `models` | | Manage model providers |
| `workspaces` | `ws` | Manage workspaces |
| `config` | | Manage configuration |
| `serve` | | Start API server |
| `diagnose` | `diag` | System diagnostics |

### Common Commands

```bash
# Generate
gentcodesign generate "landing page"
gentcodesign generate "dashboard" --model openai/gpt-4o --theme dark
gentcodesign generate "pricing" --skills pricing landing_page --format pdf

# Templates (instant, no API)
gentcodesign template landing --title "My Startup" --accent "#8b5cf6"
gentcodesign template dashboard
gentcodesign template ecommerce
gentcodesign template admin
gentcodesign template saas

# Iterate
gentcodesign iterate <id> "add dark mode"
gentcodesign iterate <id> "change colors to blue"

# Export
gentcodesign export <id> html
gentcodesign export <id> pdf
gentcodesign export <id> pptx

# Manage
gentcodesign list
gentcodesign skills
gentcodesign models
gentcodesign config --show
gentcodesign diagnose
```

---

## 🎨 26 Design Skills

Skills are auto-detected from your prompt. Or specify manually with `--skills`.

| Skill | What It Creates |
|-------|-----------------|
| `landing_page` | Hero, features, CTA, testimonials |
| `dashboard` | Stats cards, charts, tables, sidebar |
| `slides` | Full-screen presentation slides |
| `pricing` | 3-tier pricing with monthly/yearly toggle |
| `chat_ui` | Message bubbles, typing indicator |
| `portfolio` | Project grid, filters, about section |
| `mobile_app` | Phone frame, tab navigation |
| `blog` | Typography, code blocks, TOC |
| `ecommerce` | Product grid, cart, filters |
| `data_table` | Sorting, filtering, pagination |
| `calendar` | Month/week view, events |
| `form` | Multi-step wizard, validation |
| `glassmorphism` | Frosted glass effects |
| `hero` | Animated hero sections |
| `invoice` | Professional invoices |
| `error_page` | Creative 404/500 pages |
| `settings` | Tabs, toggles, sliders |
| `social_feed` | Posts, reactions, comments, stories |
| `documentation` | Sidebar nav, code blocks, API refs |
| `email_template` | Responsive email layouts |
| `waitlist` | Countdown, email capture, progress |
| `kanban` | Columns, cards, drag indicators |
| `music_player` | Controls, playlist, visualizations |
| `checkout` | Cart → shipping → payment → confirm |
| `timeline` | Vertical history, changelogs |
| `testimonial` | Quotes, ratings, carousel |

---

## ⚡ 12 Instant Templates

No API key needed. Generates beautiful HTML instantly.

```bash
gentcodesign template landing       # Modern Landing Page
gentcodesign template dashboard     # Analytics Dashboard
gentcodesign template pricing       # Pricing Page
gentcodesign template error404      # 404 Error Page
gentcodesign template chat          # Chat Interface
gentcodesign template form          # Multi-step Form
gentcodesign template ecommerce     # E-Commerce Store
gentcodesign template email         # Email Template
gentcodesign template docs          # Documentation Site
gentcodesign template onboarding    # Onboarding Flow
gentcodesign template admin         # Admin Panel
gentcodesign template saas          # SaaS Metrics Dashboard
```

Options: `--theme dark|light`, `--title "Custom Title"`, `--accent "#color"`

---

## 🤖 20 Supported Providers

### Cloud Providers

| Provider | Setup |
|----------|-------|
| **OpenAI** | `gentcodesign config --set-key openai=sk-xxx` |
| **Anthropic** | `gentcodesign config --set-key anthropic=sk-ant-xxx` |
| **Google Gemini** | `gentcodesign config --set-key gemini=xxx` |
| **DeepSeek** | `gentcodesign config --set-key deepseek=xxx` |
| **NVIDIA NIM** | `gentcodesign config --set-key nvidia=nvapi-xxx` |
| **OpenRouter** | `gentcodesign config --set-key openrouter=sk-or-xxx` |
| **Groq** | `gentcodesign config --set-key groq=gsk_xxx` |
| **Mistral** | `gentcodesign config --set-key mistral=xxx` |
| **Cohere** | `gentcodesign config --set-key cohere=xxx` |
| **Together AI** | `gentcodesign config --set-key together=xxx` |
| **Fireworks AI** | `gentcodesign config --set-key fireworks=xxx` |
| **Replicate** | `gentcodesign config --set-key replicate=r8_xxx` |
| **Hugging Face** | `gentcodesign config --set-key huggingface=hf_xxx` |
| **Azure OpenAI** | `gentcodesign config --set-key azure=xxx` |

### Local Providers (No API Key Needed)

| Provider | Setup |
|----------|-------|
| **Ollama** | Install from https://ollama.com, then just run it |
| **LM Studio** | Download from https://lmstudio.ai, start the server |
| **Jan** | Download from https://jan.ai, start the server |
| **llama.cpp** | Run `./server -m model.gguf`, port 8080 |
| **text-generation-webui** | Run Oobabooga, port 5000 |

---

## 📦 Export Formats

```bash
gentcodesign export <design-id> html    # Standalone HTML (inlined CSS)
gentcodesign export <design-id> pdf     # PDF document
gentcodesign export <design-id> pptx    # PowerPoint presentation
gentcodesign export <design-id> zip     # ZIP archive (HTML + README + metadata)
gentcodesign export <design-id> md      # Markdown text
gentcodesign export <design-id> png     # Full-page screenshot
```

---

## 🏠 Workspaces

Organize designs into projects:

```bash
gentcodesign ws --create my-project
gentcodesign ws --list
gentcodesign ws --stats
```

---

## ⚙️ Configuration

Config file: `~/.gentcodesign/config.json`

```bash
# Show current config
gentcodesign config --show

# Set default model
gentcodesign config --set models.default=openai/gpt-4o

# Set default theme
gentcodesign config --set defaults.theme=dark

# Set API key
gentcodesign config --set-key openai=sk-xxx

# Reset to defaults
gentcodesign config --reset

# Run diagnostics
gentcodesign diagnose
```

---

## 🌐 API Server

Start a REST API server for web-based agents:

```bash
gentcodesign serve --port 3700
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate` | Generate design from prompt |
| `POST` | `/api/iterate` | Iterate on existing design |
| `POST` | `/api/variations` | Generate multiple variations |
| `GET` | `/api/designs` | List saved designs |
| `GET` | `/api/designs/:id` | Get design by ID |
| `DELETE` | `/api/designs/:id` | Delete design |
| `POST` | `/api/export` | Export design |
| `GET` | `/api/skills` | List design skills |
| `POST` | `/api/skills/detect` | Auto-detect skills from prompt |
| `GET` | `/api/models` | List model providers |
| `POST` | `/api/models/test` | Test provider connection |
| `GET` | `/api/workspaces` | List workspaces |
| `POST` | `/api/workspaces` | Create workspace |
| `GET` | `/api/health` | Health check |
| `GET` | `/preview/:id` | Live preview in browser |

### Example API Calls

```bash
# Generate
curl -X POST http://localhost:3700/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "modern landing page", "theme": "dark"}'

# Streaming
curl -X POST http://localhost:3700/api/generate \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"prompt": "dashboard"}'

# List designs
curl http://localhost:3700/api/designs

# Preview
open http://localhost:3700/preview/<design-id>
```

---

## 📚 Library Usage (for Node.js Agents)

```javascript
const gcd = require('gentcodesign');

// Generate
const design = await gcd.generate('modern landing page', {
  model: 'openai/gpt-4o',
  theme: 'dark',
  style: 'modern'
});

// Access results
console.log(design.id);       // UUID
console.log(design.html);     // Full HTML string
console.log(design.skills);   // ['landing_page']
console.log(design.tokens);   // ~4200

// Iterate
const updated = await gcd.iterate(design.id, 'add dark mode toggle');

// Export
await gcd.export(design.html, 'pdf', { metadata: design });
await gcd.export(design.html, 'pptx');

// Variations
const vars = await gcd.variations('dashboard', { count: 3 });

// Skills
gcd.detectSkills('mobile app for fitness'); // ['mobile_app']
gcd.listSkills(); // All 26 skills

// Templates (instant, no API)
const html = gcd.fromTemplate('landing', { theme: 'dark' });
const html2 = gcd.fromTemplate('ecommerce', { theme: 'light' });

// Workspaces
gcd.workspaceManager.create('my-project');
gcd.workspaceManager.addDesign('my-project', design);

// Server
gcd.serve(3700); // Start API server
```

---

## 🔧 Troubleshooting

```bash
# Run diagnostics
gentcodesign diagnose

# Check if API key is set
gentcodesign models

# Test connection
gentcodesign models --test openai
```

### Common Issues

| Problem | Solution |
|---------|----------|
| `command not found: gentcodesign` | Make sure npm global bin is in your PATH: `npm config get prefix` |
| `No API key for provider` | Run `gentcodesign config --set-key provider=your-key` |
| `PDF export fails` | Puppeteer needs Chrome: `npx puppeteer browsers install chrome` |
| `Request timeout` | Large designs take 30-60s. Be patient, or try a faster model |
| `Node version too old` | Upgrade to Node.js 18+: https://nodejs.org |

---

## 📄 License

MIT

---

**npm:** https://www.npmjs.com/package/gentcodesign
**GitHub:** https://github.com/Atum246/gentcodesign
