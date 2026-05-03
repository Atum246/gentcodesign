# 🎨 GentCoDesign

**Agent-Native AI Design Engine**

> Turn prompts into polished prototypes, slides, dashboards, and marketing assets — designed for AI agents like OpenClaw, Claude Code, and more.

<p align="center">
  <strong>Your prompts → Stunning designs → Export anywhere</strong>
</p>

---

## ✨ What Is GentCoDesign?

GentCoDesign is an **agent-native design engine** that lets AI agents generate production-quality HTML prototypes, slide decks, dashboards, and more — without users installing any desktop app.

```
Agent: "Make me a pricing page"
  ↓
GentCoDesign → generates polished HTML prototype
  ↓
Agent: "Here's your pricing page!" 🎨
```

## 🚀 Quick Start

### Install

```bash
npm install -g gentcodesign
```

### CLI Usage

```bash
# Generate a design
gentcodesign generate "modern landing page for a coffee shop"

# Generate with specific model
gentcodesign generate "dashboard" --model openai/gpt-4o

# Generate and export as PDF
gentcodesign generate "pricing page" --format pdf

# List designs
gentcodesign list

# View in browser
gentcodesign view <design-id>

# Start API server
gentcodesign serve
```

### Library Usage (for Agents)

```javascript
const gcd = require('gentcodesign');

// One-liner generate
const design = await gcd.generate('modern landing page for SaaS');

// With options
const design = await gcd.generate('dashboard analytics', {
  model: 'openai/gpt-4o',
  theme: 'dark',
  style: 'modern',
  skills: ['dashboard', 'data_table']
});

// Access results
console.log(design.id);       // Design UUID
console.log(design.html);     // Full HTML
console.log(design.skills);   // Applied skills
console.log(design.tokens);   // Token estimate

// Iterate on a design
const updated = await gcd.iterate(design.id, 'Change the header to blue');

// Export
await gcd.export(design.html, 'pdf', { outputPath: './exports/' });
await gcd.export(design.html, 'pptx');
await gcd.export(design.html, 'zip');

// Generate variations
const vars = await gcd.variations('pricing page', { count: 3 });
```

### API Server Usage

```bash
# Start server
gentcodesign serve --port 3700

# Generate via API
curl -X POST http://localhost:3700/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "modern landing page"}'

# Streaming generation
curl -X POST http://localhost:3700/api/generate \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"prompt": "dashboard"}'
```

## 🎯 17 Built-in Design Skills

| Skill | Icon | Description |
|-------|------|-------------|
| Landing Page | 🚀 | Hero, features, CTA, testimonials |
| Dashboard | 📊 | Stats cards, charts, tables, sidebar |
| Slide Deck | 📽️ | Full-screen slides, keyboard nav, transitions |
| Pricing | 💰 | 3-tier pricing, monthly/yearly toggle |
| Chat UI | 💬 | Message bubbles, typing indicator, input |
| Portfolio | 🎨 | Project grid, filters, about section |
| Mobile App | 📱 | Phone frame, tab nav, realistic screens |
| Blog | 📝 | Typography, code blocks, TOC, reading bar |
| E-Commerce | 🛒 | Product grid, cart, filters, ratings |
| Data Table | 📋 | Sorting, filtering, pagination, badges |
| Calendar | 📅 | Month/week view, events, navigation |
| Form Builder | 📝 | Multi-step wizard, validation, file upload |
| Glassmorphism | ✨ | Frosted glass, gradient backgrounds |
| Hero Section | 🌟 | Animated hero with gradient text |
| Invoice | 🧾 | Professional invoice with line items |
| Error Pages | 🚫 | Creative 404/500 pages |
| Settings | ⚙️ | Tabs, toggles, sliders, grouped options |
| Auto-detect | 🤖 | Automatically selects skills from prompt |

## 🤖 Supported Models

| Provider | Models |
|----------|--------|
| Anthropic | Claude 3.5 Sonnet, Claude 3 Opus, Haiku |
| OpenAI | GPT-4o, GPT-4 Turbo, o1 |
| Google | Gemini 2.0 Flash, 1.5 Pro |
| DeepSeek | DeepSeek Chat, Coder |
| OpenRouter | Any model via OpenRouter |
| Ollama | Local models (Llama, Mistral, etc.) |
| Custom | Any OpenAI-compatible endpoint |

## 📦 Export Formats

| Format | Description |
|--------|-------------|
| `html` | Standalone HTML with inlined CSS |
| `pdf` | Print-ready PDF via headless Chrome |
| `pptx` | PowerPoint with design screenshots |
| `zip` | HTML + README + metadata |
| `md` | Markdown text content |
| `png` | Full-page screenshot |

## 🏠 Workspaces

```bash
# Create workspace
gentcodesign ws --create my-project

# List workspaces
gentcodesign ws --list

# Stats
gentcodesign ws --stats
```

## ⚙️ Configuration

```bash
# Show config
gentcodesign config --show

# Set API key
gentcodesign config --set-key anthropic=sk-ant-xxx
gentcodesign config --set-key openai=sk-xxx

# Set default model
gentcodesign config --set models.default=openai/gpt-4o

# Run diagnostics
gentcodesign diagnose
```

Config stored at: `~/.gentcodesign/config.json`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate` | Generate design from prompt |
| POST | `/api/iterate` | Iterate on existing design |
| POST | `/api/variations` | Generate multiple variations |
| GET | `/api/designs` | List saved designs |
| GET | `/api/designs/:id` | Get design by ID |
| DELETE | `/api/designs/:id` | Delete design |
| POST | `/api/export` | Export design |
| GET | `/api/skills` | List design skills |
| POST | `/api/skills/detect` | Auto-detect skills |
| GET | `/api/models` | List model providers |
| POST | `/api/models/test` | Test provider connection |
| GET | `/api/workspaces` | List workspaces |
| POST | `/api/workspaces` | Create workspace |
| GET | `/api/health` | Health check |
| GET | `/preview/:id` | Live preview |

## 🔧 Tech Stack

- **Runtime:** Node.js 18+
- **Server:** Express.js
- **Models:** OpenAI-compatible API, Anthropic, Gemini
- **PDF:** Puppeteer (headless Chrome)
- **PPTX:** pptxgenjs
- **Archive:** archiver
- **CLI:** Commander.js + Chalk + Ora

## 📄 License

MIT — use it however you want.

---

<p align="center">
  Built for the agent ecosystem 🤖🎨
</p>
