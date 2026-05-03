/**
 * GentCoDesign - Additional Templates
 * More instant templates for common use cases
 */

const EXTRA_TEMPLATES = {
  ecommerce: {
    name: 'E-Commerce Store',
    generate(opts = {}) {
      const { theme = 'dark' } = opts;
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shop</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:${theme==='dark'?'#0a0a0f':'#fff'};--fg:${theme==='dark'?'#f0f0f5':'#1a1a2e'};--muted:${theme==='dark'?'#6b7280':'#9ca3af'};--card:${theme==='dark'?'#141420':'#f8f9fa'};--border:${theme==='dark'?'#1e1e30':'#e5e7eb'};--accent:#6366f1}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
nav{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid var(--border)}
.logo{font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,var(--accent),#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-icons{display:flex;gap:16px;font-size:1.3rem}
.search{width:100%;padding:12px 16px;background:var(--card);border:1px solid var(--border);border-radius:12px;color:var(--fg);margin:20px 0;font-size:1rem}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}
.filter{padding:8px 16px;background:var(--card);border:1px solid var(--border);border-radius:9999px;font-size:.85rem;cursor:pointer;transition:.2s}
.filter:hover,.filter.active{background:var(--accent);color:white;border-color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:40px}
.product{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:all .3s;cursor:pointer}
.product:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.2)}
.product-img{height:240px;background:linear-gradient(135deg,var(--accent),#a855f7);display:flex;align-items:center;justify-content:center;font-size:3rem}
.product-info{padding:16px}
.product-info h3{font-size:1rem;margin-bottom:4px}
.product-info .price{font-size:1.2rem;font-weight:700;color:var(--accent)}
.product-info .old-price{text-decoration:line-through;color:var(--muted);font-size:.9rem;margin-left:8px}
.product-info .rating{color:#f59e0b;font-size:.85rem;margin-top:4px}
.badge{position:absolute;top:12px;right:12px;background:var(--accent);color:white;padding:4px 8px;border-radius:8px;font-size:.75rem;font-weight:600}
.product{position:relative}
.cart-bar{position:fixed;bottom:0;left:0;right:0;background:var(--card);border-top:1px solid var(--border);padding:16px 24px;display:flex;justify-content:space-between;align-items:center;transform:translateY(100%);transition:.3s}
.cart-bar.show{transform:translateY(0)}
.btn{padding:12px 24px;background:var(--accent);color:white;border:none;border-radius:12px;font-weight:600;cursor:pointer;transition:.2s}
.btn:hover{transform:translateY(-2px)}
footer{text-align:center;padding:40px 0;color:var(--muted);border-top:1px solid var(--border)}
</style>
</head>
<body>
<div class="container">
<nav><div class="logo">✦ ShopZone</div><div class="nav-icons"><span>🔍</span><span>❤️</span><span>🛒 <sup style="background:var(--accent);color:white;border-radius:50%;padding:2px 6px;font-size:.7rem">3</sup></span></div></nav>
<input class="search" placeholder="Search products...">
<div class="filters"><span class="filter active">All</span><span class="filter">Electronics</span><span class="filter">Clothing</span><span class="filter">Home</span><span class="filter">Sports</span><span class="filter">Books</span></div>
<div class="grid">
<div class="product"><span class="badge">-20%</span><div class="product-img">🎧</div><div class="product-info"><h3>Wireless Headphones Pro</h3><div class="price">$79 <span class="old-price">$99</span></div><div class="rating">★★★★★ (2,847)</div></div></div>
<div class="product"><div class="product-img">⌚</div><div class="product-info"><h3>Smart Watch Ultra</h3><div class="price">$299</div><div class="rating">★★★★☆ (1,203)</div></div></div>
<div class="product"><span class="badge">New</span><div class="product-img">👟</div><div class="product-info"><h3>Running Shoes Air</h3><div class="price">$129</div><div class="rating">★★★★★ (956)</div></div></div>
<div class="product"><div class="product-img">🎒</div><div class="product-info"><h3>Travel Backpack 40L</h3><div class="price">$89</div><div class="rating">★★★★☆ (3,421)</div></div></div>
<div class="product"><span class="badge">-15%</span><div class="product-img">💻</div><div class="product-info"><h3>MacBook Pro Stand</h3><div class="price">$49 <span class="old-price">$59</span></div><div class="rating">★★★★★ (782)</div></div></div>
<div class="product"><div class="product-img">📱</div><div class="product-info"><h3>Phone Case MagSafe</h3><div class="price">$29</div><div class="rating">★★★★☆ (5,102)</div></div></div>
<div class="product"><div class="product-img">🎮</div><div class="product-info"><h3>Game Controller</h3><div class="price">$59</div><div class="rating">★★★★★ (1,847)</div></div></div>
<div class="product"><span class="badge">Sale</span><div class="product-img">📷</div><div class="product-info"><h3>Webcam 4K HD</h3><div class="price">$69 <span class="old-price">$99</span></div><div class="rating">★★★★☆ (892)</div></div></div>
</div>
<footer>© 2026 ShopZone. All rights reserved. · Free shipping on orders over $50</footer>
</div>
</body>
</html>`;
    }
  },

  email: {
    name: 'Email Template',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;padding:40px 20px}
.email{max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08)}
.header{background:linear-gradient(135deg,#6366f1,#a855f7);padding:40px;text-align:center;color:white}
.header h1{font-size:1.8rem;margin-bottom:8px}
.body{padding:40px}
.body p{color:#4a5568;line-height:1.8;margin-bottom:16px}
.btn{display:inline-block;padding:14px 32px;background:#6366f1;color:white;text-decoration:none;border-radius:12px;font-weight:600;margin:20px 0}
.features{background:#f8f9fa;border-radius:12px;padding:24px;margin:24px 0}
.feature{display:flex;gap:12px;margin-bottom:16px}
.feature-icon{font-size:1.5rem}
.feature h3{font-size:.95rem;margin-bottom:2px}
.feature p{font-size:.85rem;color:#6b7280}
.divider{height:1px;background:#e5e7eb;margin:24px 0}
.footer{padding:24px 40px;background:#f8f9fa;text-align:center;color:#9ca3af;font-size:.85rem}
.social{margin:16px 0}
.social a{display:inline-block;margin:0 8px;color:#6366f1;text-decoration:none;font-size:1.2rem}
</style>
</head>
<body>
<div class="email">
<div class="header"><h1>Welcome to GentCoDesign! 🎨</h1><p>Your design journey starts here</p></div>
<div class="body">
<p>Hi there,</p>
<p>Thanks for signing up! We're thrilled to have you on board. GentCoDesign makes it easy to create stunning designs from simple prompts.</p>
<div class="features">
<div class="feature"><div class="feature-icon">⚡</div><div><h3>Instant Generation</h3><p>Create prototypes in seconds, not hours</p></div></div>
<div class="feature"><div class="feature-icon">🎨</div><div><h3>17 Design Skills</h3><p>From landing pages to dashboards</p></div></div>
<div class="feature"><div class="feature-icon">📦</div><div><h3>6 Export Formats</h3><p>HTML, PDF, PPTX, ZIP, Markdown, PNG</p></div></div>
</div>
<p>Ready to create your first design?</p>
<a href="#" class="btn">Get Started →</a>
<div class="divider"></div>
<p style="font-size:.9rem;color:#9ca3af">Need help? Reply to this email or check out our <a href="#" style="color:#6366f1">documentation</a>.</p>
</div>
<div class="footer">
<div class="social"><a href="#">𝕏</a><a href="#">in</a><a href="#">gh</a></div>
<p>You received this because you signed up at gentcodesign.dev</p>
<p><a href="#" style="color:#6366f1">Unsubscribe</a> · <a href="#" style="color:#6366f1">Preferences</a></p>
</div>
</div>
</body>
</html>`;
    }
  },

  docs: {
    name: 'Documentation Site',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Documentation</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f0f17;--sidebar:#141420;--card:#1a1a2e;--fg:#e5e5ef;--muted:#6b7280;--accent:#6366f1;--border:#1e1e30}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--fg);display:flex;min-height:100vh}
.sidebar{width:280px;background:var(--sidebar);border-right:1px solid var(--border);padding:24px;position:fixed;height:100vh;overflow-y:auto}
.sidebar .logo{font-size:1.2rem;font-weight:800;margin-bottom:32px;background:linear-gradient(135deg,var(--accent),#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sidebar h4{color:var(--muted);font-size:.75rem;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px}
.sidebar a{display:block;padding:6px 0;color:var(--muted);text-decoration:none;font-size:.9rem;transition:.2s}
.sidebar a:hover,.sidebar a.active{color:var(--accent)}
.main{margin-left:280px;flex:1;padding:40px 60px;max-width:900px}
.main h1{font-size:2.5rem;margin-bottom:8px}
.subtitle{color:var(--muted);font-size:1.1rem;margin-bottom:32px}
.content h2{font-size:1.5rem;margin:40px 0 16px;padding-top:24px;border-top:1px solid var(--border)}
.content h3{font-size:1.2rem;margin:24px 0 12px}
.content p{color:var(--muted);line-height:1.8;margin-bottom:16px}
.content pre{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;overflow-x:auto;margin:16px 0;font-size:.9rem;line-height:1.6}
.content code{font-family:'SF Mono',monospace;color:var(--accent)}
.content pre code{color:var(--fg)}
.content .inline-code{background:var(--card);padding:2px 6px;border-radius:4px;font-size:.85rem}
.callout{background:rgba(99,102,241,.1);border-left:4px solid var(--accent);padding:16px 20px;border-radius:0 12px 12px 0;margin:20px 0}
.callout-title{font-weight:600;margin-bottom:4px}
table{width:100%;border-collapse:collapse;margin:16px 0}
th{text-align:left;padding:10px;border-bottom:2px solid var(--border);color:var(--muted);font-size:.85rem}
td{padding:10px;border-bottom:1px solid var(--border)}
.badge{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:.75rem;font-weight:600;background:rgba(99,102,241,.15);color:var(--accent)}
</style>
</head>
<body>
<aside class="sidebar">
<div class="logo">📖 Docs</div>
<h4>Getting Started</h4>
<a href="#" class="active">Introduction</a><a href="#">Installation</a><a href="#">Quick Start</a><a href="#">Configuration</a>
<h4>Features</h4>
<a href="#">Generation</a><a href="#">Templates</a><a href="#">Export</a><a href="#">Skills</a>
<h4>API Reference</h4>
<a href="#">REST API</a><a href="#">CLI</a><a href="#">Library</a>
<h4>Guides</h4>
<a href="#">Agent Integration</a><a href="#">Custom Skills</a><a href="#">Self-hosting</a>
</aside>
<main class="main">
<h1>Introduction</h1>
<p class="subtitle">Agent-native AI design engine for generating prototypes, slides, and dashboards.</p>
<div class="content">
<div class="callout"><div class="callout-title">💡 Quick Start</div><p>Get up and running in under a minute: <code class="inline-code">npm install -g gentcodesign && gentcodesign generate "landing page"</code></p></div>
<h2>What is GentCoDesign?</h2>
<p>GentCoDesign is an AI-powered design engine that turns natural language prompts into production-quality HTML prototypes. It's built for AI agents like OpenClaw, Claude Code, and more.</p>
<h2>Key Features</h2>
<table><tr><th>Feature</th><th>Description</th></tr>
<tr><td>17 Design Skills</td><td><span class="badge">Auto-detected</span> Landing pages, dashboards, pricing, and more</td></tr>
<tr><td>6 Templates</td><td><span class="badge">Instant</span> Generate without API keys</td></tr>
<tr><td>7+ Providers</td><td><span class="badge">BYOK</span> OpenAI, Anthropic, Gemini, NVIDIA, and more</td></tr>
<tr><td>6 Export Formats</td><td><span class="badge">HTML</span> PDF, PPTX, ZIP, Markdown, PNG</td></tr>
</table>
<h2>Installation</h2>
<pre><code>npm install -g gentcodesign</code></pre>
<h2>Usage</h2>
<h3>CLI</h3>
<pre><code>gentcodesign generate "modern dashboard"
gentcodesign template landing
gentcodesign export &lt;id&gt; pdf</code></pre>
<h3>Library</h3>
<pre><code>const gcd = require('gentcodesign');
const design = await gcd.generate('pricing page');
console.log(design.html);</code></pre>
</div>
</main>
</body>
</html>`;
    }
  },

  onboarding: {
    name: 'Onboarding Flow',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0f;color:#f0f0f5;display:flex;align-items:center;justify-content:center;min-height:100vh}
.container{max-width:800px;width:100%;padding:40px}
.steps{display:flex;justify-content:center;gap:24px;margin-bottom:48px}
.step{display:flex;align-items:center;gap:8px;color:#6b7280;transition:.3s}
.step.active{color:#6366f1}
.step.done{color:#22c55e}
.step .num{width:32px;height:32px;border-radius:50%;border:2px solid currentColor;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem}
.step.active .num{background:#6366f1;color:white;border-color:#6366f1}
.step.done .num{background:#22c55e;color:white;border-color:#22c55e}
.step .line{width:60px;height:2px;background:#1e1e30}
.card{background:#141420;border:1px solid #1e1e30;border-radius:20px;padding:48px;text-align:center;animation:fadeIn .5s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.card h1{font-size:2rem;margin-bottom:8px}
.card p{color:#6b7280;margin-bottom:32px;font-size:1.1rem}
.options{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px}
.option{background:#1a1a2e;border:2px solid #1e1e30;border-radius:16px;padding:24px;cursor:pointer;transition:all .3s}
.option:hover{border-color:#6366f1}
.option.selected{border-color:#6366f1;background:rgba(99,102,241,.1)}
.option .icon{font-size:2rem;margin-bottom:8px}
.option h3{font-size:.95rem;margin-bottom:4px}
.option p{font-size:.8rem;color:#6b7280}
.btn{padding:14px 32px;background:#6366f1;color:white;border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s;width:100%}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.3)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.skip{color:#6b7280;text-align:center;margin-top:16px;cursor:pointer;font-size:.9rem}
.skip:hover{color:#f0f0f5}
.emoji-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:24px 0}
.emoji-btn{width:56px;height:56px;background:#1a1a2e;border:2px solid #1e1e30;border-radius:12px;font-size:1.5rem;cursor:pointer;transition:.2s}
.emoji-btn:hover,.emoji-btn.selected{border-color:#6366f1;transform:scale(1.1)}
</style>
</head>
<body>
<div class="container">
<div class="steps">
<div class="step done"><div class="num">✓</div><span>Welcome</span></div>
<div class="step active"><div class="num">2</div><span>Use Case</span></div>
<div class="step"><div class="num">3</div><span>Preferences</span></div>
<div class="step"><div class="num">4</div><span>Ready!</span></div>
</div>
<div class="card">
<h1>What will you create? 🎨</h1>
<p>Select your primary use case so we can personalize your experience.</p>
<div class="options">
<div class="option" onclick="this.classList.toggle('selected')"><div class="icon">🚀</div><h3>Landing Pages</h3><p>Marketing & conversion</p></div>
<div class="option" onclick="this.classList.toggle('selected')"><div class="icon">📊</div><h3>Dashboards</h3><p>Data & analytics</p></div>
<div class="option" onclick="this.classList.toggle('selected')"><div class="icon">📽️</div><h3>Presentations</h3><p>Pitch decks & slides</p></div>
<div class="option" onclick="this.classList.toggle('selected')"><div class="icon">📱</div><h3>Mobile Apps</h3><p>App mockups</p></div>
<div class="option" onclick="this.classList.toggle('selected')"><div class="icon">🛒</div><h3>E-Commerce</h3><p>Product pages</p></div>
<div class="option" onclick="this.classList.toggle('selected')"><div class="icon">📝</div><h3>Forms</h3><p>Wizards & surveys</p></div>
</div>
<button class="btn" onclick="this.textContent='Setting up... 🚀'">Continue →</button>
<p class="skip">Skip for now</p>
</div>
</div>
</body>
</html>`;
    }
  },

  admin: {
    name: 'Admin Panel',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Panel</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f0f17;--sidebar:#141420;--card:#1a1a2e;--fg:#e5e5ef;--muted:#6b7280;--accent:#6366f1;--border:#1e1e30;--green:#22c55e;--red:#ef4444;--orange:#f59e0b}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--fg);display:flex;min-height:100vh}
.sidebar{width:250px;background:var(--sidebar);border-right:1px solid var(--border);padding:20px}
.sidebar .logo{font-size:1.2rem;font-weight:800;margin-bottom:24px;color:var(--accent)}
.sidebar nav a{display:flex;align-items:center;gap:10px;padding:10px 12px;color:var(--muted);text-decoration:none;border-radius:8px;margin-bottom:4px;transition:.2s}
.sidebar nav a:hover,.sidebar nav a.active{background:rgba(99,102,241,.1);color:var(--accent)}
.main{flex:1;padding:24px;overflow-y:auto}
.topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.search{padding:8px 16px;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--fg);width:300px}
.user{display:flex;align-items:center;gap:8px}
.avatar{width:32px;height:32px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700}
.tabs{display:flex;gap:4px;margin-bottom:24px;background:var(--card);border-radius:12px;padding:4px;width:fit-content}
.tab{padding:8px 16px;border-radius:8px;cursor:pointer;font-size:.85rem;transition:.2s}
.tab.active{background:var(--accent);color:white}
table{width:100%;border-collapse:collapse;background:var(--card);border-radius:12px;overflow:hidden}
th{text-align:left;padding:12px 16px;color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border)}
td{padding:12px 16px;border-bottom:1px solid var(--border)}
tr:hover{background:rgba(99,102,241,.05)}
.badge{padding:2px 8px;border-radius:9999px;font-size:.75rem;font-weight:600}
.badge-active{background:rgba(34,197,94,.15);color:var(--green)}
.badge-inactive{background:rgba(239,68,68,.15);color:var(--red)}
.badge-pending{background:rgba(245,158,11,.15);color:var(--orange)}
.actions{display:flex;gap:4px}
.action{padding:6px;background:none;border:1px solid var(--border);border-radius:6px;color:var(--muted);cursor:pointer;font-size:.85rem;transition:.2s}
.action:hover{border-color:var(--accent);color:var(--accent)}
.pagination{display:flex;justify-content:space-between;align-items:center;margin-top:16px;color:var(--muted);font-size:.85rem}
.pages{display:flex;gap:4px}
.page{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:6px;cursor:pointer;transition:.2s}
.page:hover,.page.active{background:var(--accent);color:white}
</style>
</head>
<body>
<aside class="sidebar"><div class="logo">⚡ AdminPanel</div><nav>
<a class="active">📊 Dashboard</a><a>👥 Users</a><a>📦 Products</a><a>🛒 Orders</a><a>💳 Payments</a><a>📈 Analytics</a><a>⚙️ Settings</a>
</nav></aside>
<main class="main">
<div class="topbar"><input class="search" placeholder="Search..."><div class="user"><div class="avatar">JD</div>John Doe ▾</div></div>
<div class="tabs"><span class="tab active">All Users</span><span class="tab">Active</span><span class="tab">Pending</span><span class="tab">Inactive</span></div>
<table>
<thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
<tbody>
<tr><td>Alice Johnson</td><td>alice@company.com</td><td>Admin</td><td><span class="badge badge-active">Active</span></td><td>Jan 15, 2026</td><td class="actions"><button class="action">✏️</button><button class="action">🗑️</button></td></tr>
<tr><td>Bob Smith</td><td>bob@startup.io</td><td>Editor</td><td><span class="badge badge-active">Active</span></td><td>Feb 3, 2026</td><td class="actions"><button class="action">✏️</button><button class="action">🗑️</button></td></tr>
<tr><td>Carol White</td><td>carol@design.co</td><td>Viewer</td><td><span class="badge badge-pending">Pending</span></td><td>Mar 12, 2026</td><td class="actions"><button class="action">✏️</button><button class="action">🗑️</button></td></tr>
<tr><td>David Lee</td><td>david@tech.com</td><td>Editor</td><td><span class="badge badge-inactive">Inactive</span></td><td>Apr 5, 2026</td><td class="actions"><button class="action">✏️</button><button class="action">🗑️</button></td></tr>
<tr><td>Eva Martinez</td><td>eva@agency.com</td><td>Admin</td><td><span class="badge badge-active">Active</span></td><td>Apr 28, 2026</td><td class="actions"><button class="action">✏️</button><button class="action">🗑️</button></td></tr>
</tbody>
</table>
<div class="pagination"><span>Showing 1-5 of 128 users</span><div class="pages"><span class="page">←</span><span class="page active">1</span><span class="page">2</span><span class="page">3</span><span class="page">...</span><span class="page">26</span><span class="page">→</span></div></div>
</main>
</body>
</html>`;
    }
  },

  saas: {
    name: 'SaaS Metrics Dashboard',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SaaS Metrics</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0f;--card:#141420;--fg:#f0f0f5;--muted:#6b7280;--accent:#6366f1;--green:#22c55e;--red:#ef4444;--border:#1e1e30}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--fg);padding:24px;max-width:1400px;margin:0 auto}
h1{font-size:1.5rem;margin-bottom:24px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.metric{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.metric .label{color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.5px}
.metric .value{font-size:2rem;font-weight:800;margin:8px 0}
.metric .trend{font-size:.85rem}
.metric .trend.up{color:var(--green)}
.metric .trend.down{color:var(--red)}
.chart-row{display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:24px}
.chart{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.chart h3{font-size:1rem;margin-bottom:16px}
.mrr-chart{height:200px;display:flex;align-items:flex-end;gap:4px}
.bar{flex:1;background:linear-gradient(to top,var(--accent),#818cf8);border-radius:4px 4px 0 0;transition:.3s}
.bar:hover{opacity:.8}
.donut{width:160px;height:160px;border-radius:50%;background:conic-gradient(var(--green) 0% 68%,var(--accent) 68% 85%,var(--red) 85% 92%,#374151 92% 100%);margin:0 auto;position:relative}
.donut::after{content:'';position:absolute;inset:24px;background:var(--card);border-radius:50%}
.legend{margin-top:16px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;font-size:.8rem;color:var(--muted)}
.cohort{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.cohort h3{margin-bottom:16px}
table{width:100%;border-collapse:collapse;font-size:.85rem}
th{padding:8px;color:var(--muted);text-align:left;border-bottom:1px solid var(--border)}
td{padding:8px;border-bottom:1px solid var(--border)}
.heat{display:inline-block;width:40px;height:24px;border-radius:4px;text-align:center;line-height:24px;font-size:.75rem;font-weight:600}
</style>
</head>
<body>
<h1>📈 SaaS Metrics</h1>
<div class="grid">
<div class="metric"><div class="label">MRR</div><div class="value">$127.4K</div><div class="trend up">↑ 14.2% MoM</div></div>
<div class="metric"><div class="label">ARR</div><div class="value">$1.53M</div><div class="trend up">↑ 22.8% YoY</div></div>
<div class="metric"><div class="label">Churn Rate</div><div class="value">2.1%</div><div class="trend down">↓ 0.3% MoM</div></div>
<div class="metric"><div class="label">LTV:CAC</div><div class="value">4.2x</div><div class="trend up">↑ 0.4x QoQ</div></div>
<div class="metric"><div class="label">Active Users</div><div class="value">8,247</div><div class="trend up">↑ 8.2%</div></div>
<div class="metric"><div class="label">ARPU</div><div class="value">$15.44</div><div class="trend up">↑ $1.20</div></div>
<div class="metric"><div class="label">NPS</div><div class="value">72</div><div class="trend up">↑ 5 pts</div></div>
<div class="metric"><div class="label">Payback</div><div class="value">8 mo</div><div class="trend down">↓ 2 mo</div></div>
</div>
<div class="chart-row">
<div class="chart"><h3>MRR Growth (12 months)</h3><div class="mrr-chart">
<div class="bar" style="height:40%"></div><div class="bar" style="height:45%"></div><div class="bar" style="height:42%"></div>
<div class="bar" style="height:52%"></div><div class="bar" style="height:58%"></div><div class="bar" style="height:55%"></div>
<div class="bar" style="height:65%"></div><div class="bar" style="height:70%"></div><div class="bar" style="height:68%"></div>
<div class="bar" style="height:78%"></div><div class="bar" style="height:82%"></div><div class="bar" style="height:90%"></div>
</div></div>
<div class="chart"><h3>Revenue by Plan</h3><div class="donut"></div><div class="legend"><span>🟢 Enterprise 68%</span><span>🔵 Pro 17%</span><span>🔴 Starter 7%</span><span>⚪ Free 8%</span></div></div>
</div>
<div class="cohort"><h3>Retention Cohort</h3><table>
<thead><tr><th>Cohort</th><th>Month 1</th><th>Month 2</th><th>Month 3</th><th>Month 4</th><th>Month 5</th><th>Month 6</th></tr></thead>
<tbody>
<tr><td>Jan 2026</td><td><span class="heat" style="background:var(--green);color:white">100%</span></td><td><span class="heat" style="background:var(--green);color:white">92%</span></td><td><span class="heat" style="background:var(--green);color:white">88%</span></td><td><span class="heat" style="background:var(--accent);color:white">84%</span></td><td><span class="heat" style="background:var(--accent);color:white">81%</span></td><td><span class="heat" style="background:var(--accent);color:white">79%</span></td></tr>
<tr><td>Feb 2026</td><td><span class="heat" style="background:var(--green);color:white">100%</span></td><td><span class="heat" style="background:var(--green);color:white">94%</span></td><td><span class="heat" style="background:var(--green);color:white">90%</span></td><td><span class="heat" style="background:var(--green);color:white">86%</span></td><td><span class="heat" style="background:var(--accent);color:white">83%</span></td><td></td></tr>
<tr><td>Mar 2026</td><td><span class="heat" style="background:var(--green);color:white">100%</span></td><td><span class="heat" style="background:var(--green);color:white">91%</span></td><td><span class="heat" style="background:var(--green);color:white">87%</span></td><td><span class="heat" style="background:var(--accent);color:white">82%</span></td><td></td><td></td></tr>
</tbody></table></div>
</body>
</html>`;
    }
  }
};

module.exports = EXTRA_TEMPLATES;
