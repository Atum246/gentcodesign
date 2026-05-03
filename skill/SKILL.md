# GentCoDesign Skill

Agent-native AI design engine. Generate production-quality HTML prototypes, slide decks, dashboards, and more from natural language prompts.

## When to Use

Use this skill when the user asks to:
- Generate a design, prototype, or UI mockup
- Create a landing page, dashboard, pricing page, slide deck, etc.
- Build a visual prototype from a description
- Export designs to HTML, PDF, PPTX, or other formats
- Iterate on or modify an existing design

## Prerequisites

GentCoDesign must be installed on the system:

```bash
# If not installed, install it:
npm install -g gentcodesign

# Verify installation
gentcodesign --version
```

An API key for at least one model provider must be configured:

```bash
# Set API key (pick one)
gentcodesign config --set-key openai=sk-xxx
gentcodesign config --set-key anthropic=sk-ant-xxx
gentcodesign config --set-key gemini=xxx
```

## Quick Reference

### Generate a Design

```bash
# Basic generation
gentcodesign generate "modern landing page for coffee shop"

# With options
gentcodesign generate "analytics dashboard" --model openai/gpt-4o --theme dark --style modern

# With specific skills
gentcodesign generate "pricing page" --skills pricing landing_page

# Generate and export
gentcodesign generate "invoice template" --format pdf --output ./exports/

# Quiet mode (JSON output for agent consumption)
GENT_JSON=true gentcodesign generate "contact form" --quiet
```

### Iterate on a Design

```bash
# Modify an existing design
gentcodesign iterate <design-id> "change the header to blue gradient"
gentcodesign iterate <design-id> "add a testimonials section"
gentcodesign iterate <design-id> "make it responsive for mobile"
```

### Generate Variations

```bash
# Create 3 different styles
gentcodesign variations "landing page for SaaS" --count 3
```

### Export

```bash
gentcodesign export <design-id> html    # Standalone HTML
gentcodesign export <design-id> pdf     # PDF document
gentcodesign export <design-id> pptx    # PowerPoint
gentcodesign export <design-id> zip     # ZIP archive
gentcodesign export <design-id> md      # Markdown
gentcodesign export <design-id> png     # Screenshot
```

### List & View

```bash
gentcodesign list                 # List saved designs
gentcodesign view <design-id>     # Open in browser
gentcodesign skills               # List design skills
gentcodesign skills --detect "landing page for startup"  # Auto-detect skills
```

### API Server

```bash
# Start server
gentcodesign serve --port 3700

# Then use HTTP API:
# POST /api/generate    - Generate design
# POST /api/iterate     - Iterate design
# GET  /api/designs     - List designs
# GET  /preview/:id     - Live preview
```

## Library Usage (for Node.js agents)

```javascript
const gcd = require('gentcodesign');

// Generate
const design = await gcd.generate('pricing page for SaaS', {
  model: 'openai/gpt-4o',
  theme: 'dark',
  style: 'modern',
  skills: ['pricing']
});

// design.id       - UUID
// design.html     - Full HTML
// design.skills   - Applied skills
// design.tokens   - Token estimate

// Iterate
const updated = await gcd.iterate(design.id, 'add dark mode toggle');

// Export
await gcd.export(design.html, 'pdf', { metadata: design });

// Variations
const vars = await gcd.variations('dashboard', { count: 3 });

// Skills
gcd.detectSkills('mobile app fitness tracker');  // ['mobile_app']
gcd.listSkills();  // All 17 skills

// Templates (instant, no API needed)
const tpl = require('gentcodesign/src/templates/engine');
const html = tpl.generate('dashboard', { theme: 'dark' });
```

## Available Design Skills

| ID | Description |
|----|-------------|
| `landing_page` | Hero, features, CTA, testimonials |
| `dashboard` | Stats cards, charts, tables, sidebar |
| `slides` | Full-screen presentation slides |
| `pricing` | 3-tier pricing with toggle |
| `chat_ui` | Message bubbles, typing indicator |
| `portfolio` | Project grid, filters, about |
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

## Template Engine (Instant Generation)

For instant generation without API calls:

```bash
# Available templates: landing, dashboard, pricing, error404, chat, form
node -e "const t=require('gentcodesign/src/templates/engine'); console.log(t.generate('landing', {theme:'dark'}))"
```

## Supported Models

- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Haiku
- **OpenAI**: GPT-4o, GPT-4 Turbo, o1
- **Google**: Gemini 2.0 Flash, 1.5 Pro
- **DeepSeek**: DeepSeek Chat, Coder
- **OpenRouter**: Any model
- **Ollama**: Local models (Llama, Mistral, etc.)
- **Custom**: Any OpenAI-compatible endpoint

## Configuration

Config file: `~/.gentcodesign/config.json`

```bash
# Show config
gentcodesign config --show

# Set default model
gentcodesign config --set models.default=openai/gpt-4o

# Set theme
gentcodesign config --set defaults.theme=dark

# Run diagnostics
gentcodesign diagnose
```

## Workflow Examples

### Agent: "Make me a landing page"

```bash
# 1. Generate
design=$(gentcodesign generate "modern landing page for AI startup" --quiet)
id=$(echo $design | jq -r '.id')

# 2. Preview URL
echo "Preview: http://localhost:3700/preview/$id"

# 3. Export for user
gentcodesign export $id html --output ./output/
```

### Agent: Iterative Design Flow

```bash
# 1. Initial design
id1=$(gentcodesign generate "SaaS pricing page" --quiet | jq -r '.id')

# 2. User feedback → iterate
id2=$(gentcodesign iterate $id1 "make the Pro plan highlighted as most popular" --quiet | jq -r '.id')

# 3. More feedback
id3=$(gentcodesign iterate $id2 "add a FAQ section below pricing" --quiet | jq -r '.id')

# 4. Export final
gentcodesign export $id3 pdf
```

## Troubleshooting

```bash
# Run diagnostics
gentcodesign diagnose

# Check if API key is set
gentcodesign models

# Test connection
gentcodesign models --test openai
```

Common issues:
- **No API key**: Run `gentcodesign config --set-key provider=your-key`
- **PDF export fails**: Puppeteer needs Chrome. Install: `npx puppeteer browsers install chrome`
- **Timeout**: Large designs may take 30-60s. Be patient.
