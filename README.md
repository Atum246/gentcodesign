# 🎨 GentCoDesign

**Agent-Native AI Design Engine**

> Turn prompts into polished prototypes, slides, dashboards, and marketing assets — designed for AI agents like OpenClaw, Claude Code, and more.

---

## ⚡ Install

```bash
npm install -g gentcodesign
```

That's it. One command. You now have `gentcodesign` and `gcd` available globally.

## 🚀 Quick Start

### 1. Set an API key (pick one)

```bash
gentcodesign config --set-key openai=sk-your-key-here
# or
gentcodesign config --set-key anthropic=sk-ant-your-key-here
# or
gentcodesign config --set-key gemini=your-key-here
```

### 2. Generate a design

```bash
gentcodesign generate "modern landing page for a coffee shop"
```

### 3. Done.

The HTML file is saved to `./gentcodesign-output/`. Open it in any browser.

---

## 🎯 Usage

### CLI

```bash
# Generate from prompt
gentcodesign generate "analytics dashboard"

# With options
gentcodesign generate "pricing page" --model openai/gpt-4o --theme dark --style modern

# Export to PDF
gentcodesign generate "invoice template" --format pdf

# Instant templates (no API key needed)
gentcodesign template landing
gentcodesign template dashboard
gentcodesign template pricing
gentcodesign template chat
gentcodesign template form
gentcodesign template error404

# List saved designs
gentcodesign list

# Iterate on a design
gentcodesign iterate <design-id> "make the header blue"

# Generate 3 variations
gentcodesign variations "SaaS landing page"

# Export
gentcodesign export <design-id> pdf
gentcodesign export <design-id> pptx
gentcodesign export <design-id> zip

# Start API server
gentcodesign serve

# Run diagnostics
gentcodesign diagnose
```

Short alias: `gcd` works the same as `gentcodesign`.

### Library (for agents)

```javascript
const gcd = require('gentcodesign');

// Generate
const design = await gcd.generate('modern landing page', {
  model: 'openai/gpt-4o',
  theme: 'dark'
});

console.log(design.id);    // UUID
console.log(design.html);  // Full HTML string

// Iterate
const updated = await gcd.iterate(design.id, 'add a dark mode toggle');

// Export
await gcd.export(design.html, 'pdf', { metadata: design });

// Variations
const vars = await gcd.variations('dashboard', { count: 3 });

// Skills
gcd.detectSkills('mobile app for fitness'); // ['mobile_app']

// Templates (instant, no API)
const html = gcd.fromTemplate('landing', { theme: 'dark' });
```

### API Server

```bash
gentcodesign serve --port 3700
```

```bash
# Generate
curl -X POST http://localhost:3700/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "modern landing page"}'

# List designs
curl http://localhost:3700/api/designs

# Preview
open http://localhost:3700/preview/<design-id>
```

---

## 🎨 26 Design Skills

| Skill | What it makes |
|-------|---------------|
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

Skills are auto-detected from your prompt. Or specify manually:

```bash
gentcodesign generate "admin panel" --skills dashboard data_table
```

## ⚡ 12 Instant Templates

No API key needed. Generates beautiful HTML instantly.

```bash
gentcodesign template landing --title "My Startup" --accent "#8b5cf6"
gentcodesign template dashboard --theme dark
gentcodesign template pricing
gentcodesign template chat
gentcodesign template form
gentcodesign template error404
gentcodesign template ecommerce
gentcodesign template email
gentcodesign template docs
gentcodesign template onboarding
gentcodesign template admin
gentcodesign template saas
```

## 🤖 20 Supported Providers

| Provider | How to set up |
|----------|---------------|
| OpenAI | `gentcodesign config --set-key openai=sk-xxx` |
| Anthropic | `gentcodesign config --set-key anthropic=sk-ant-xxx` |
| Google Gemini | `gentcodesign config --set-key gemini=xxx` |
| DeepSeek | `gentcodesign config --set-key deepseek=xxx` |
| NVIDIA NIM | `gentcodesign config --set-key nvidia=nvapi-xxx` |
| OpenRouter | `gentcodesign config --set-key openrouter=sk-or-xxx` |
| Groq | `gentcodesign config --set-key groq=gsk_xxx` |
| Mistral | `gentcodesign config --set-key mistral=xxx` |
| Cohere | `gentcodesign config --set-key cohere=xxx` |
| Together AI | `gentcodesign config --set-key together=xxx` |
| Fireworks AI | `gentcodesign config --set-key fireworks=xxx` |
| Replicate | `gentcodesign config --set-key replicate=r8_xxx` |
| Hugging Face | `gentcodesign config --set-key huggingface=hf_xxx` |
| Azure OpenAI | `gentcodesign config --set-key azure=xxx` |
| Ollama | Local — no key needed, just run Ollama |
| LM Studio | Local — no key needed, just run LM Studio |
| Jan | Local — no key needed, just run Jan |
| llama.cpp | Local — no key needed, just run the server |
| text-generation-webui | Local — no key needed |
| Custom | Any OpenAI-compatible endpoint |

## 📦 Export Formats

```bash
gentcodesign export <id> html    # Standalone HTML
gentcodesign export <id> pdf     # PDF document
gentcodesign export <id> pptx    # PowerPoint
gentcodesign export <id> zip     # ZIP archive
gentcodesign export <id> md      # Markdown
gentcodesign export <id> png     # Screenshot
```

## 🏠 Workspaces

```bash
gentcodesign ws --create my-project
gentcodesign ws --list
gentcodesign ws --stats
```

## ⚙️ Configuration

```bash
gentcodesign config --show                    # Show config
gentcodesign config --set models.default=openai/gpt-4o
gentcodesign config --set defaults.theme=dark
gentcodesign config --set-key openai=sk-xxx
gentcodesign diagnose                         # System check
```

Config file: `~/.gentcodesign/config.json`

---

## 📋 Full Command Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `generate <prompt>` | `gen` | Generate design from prompt |
| `iterate <id> <text>` | `iter` | Modify an existing design |
| `variations <prompt>` | `vars` | Generate 3 style variations |
| `export <id> <format>` | | Export to HTML/PDF/PPTX/ZIP/MD/PNG |
| `template <name>` | `tpl` | Instant template (no API) |
| `list` | `ls` | List saved designs |
| `view <id>` | | Open in browser |
| `skills` | | List design skills |
| `models` | | Manage model providers |
| `workspaces` | `ws` | Manage workspaces |
| `config` | | Manage configuration |
| `serve` | | Start API server |
| `diagnose` | `diag` | System diagnostics |

---

## 🔧 Tech Stack

- Node.js 18+
- Express.js (API server)
- Puppeteer (PDF/PNG export)
- Commander.js (CLI)
- OpenAI-compatible API protocol

## 📄 License

MIT

---

**GitHub:** https://github.com/Atum246/gentcodesign
**npm:** https://www.npmjs.com/package/gentcodesign
