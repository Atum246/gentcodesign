/**
 * GentCoDesign - Template Engine
 * Pre-built HTML templates for instant generation without API calls
 * Also serves as scaffolds for AI generation
 */

const TEMPLATES = {
  landing: {
    name: 'Modern Landing Page',
    generate(opts = {}) {
      const { theme = 'dark', accent = '#6366f1', title = 'Build Something Amazing', subtitle = 'The modern platform for teams who ship fast', cta = 'Get Started Free' } = opts;
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--accent:${accent};--bg:${theme === 'dark' ? '#0a0a0f' : '#ffffff'};--fg:${theme === 'dark' ? '#f0f0f5' : '#1a1a2e'};--muted:${theme === 'dark' ? '#6b7280' : '#9ca3af'};--card:${theme === 'dark' ? '#141420' : '#f8f9fa'};--border:${theme === 'dark' ? '#1e1e30' : '#e5e7eb'}}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--fg);line-height:1.6}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
.logo{font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,var(--accent),#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-links{display:flex;gap:32px;list-style:none}
.nav-links a{color:var(--muted);text-decoration:none;transition:color .2s}
.nav-links a:hover{color:var(--fg)}
.hero{text-align:center;padding:120px 0 80px}
.hero h1{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800;line-height:1.1;margin-bottom:24px;background:linear-gradient(135deg,var(--fg) 0%,var(--accent) 50%,#a855f7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.25rem;color:var(--muted);max-width:600px;margin:0 auto 40px}
.btn{display:inline-block;padding:14px 32px;background:var(--accent);color:white;border:none;border-radius:12px;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all .3s;text-decoration:none}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,.4)}
.btn-outline{background:transparent;border:2px solid var(--accent);color:var(--accent)}
.btn-outline:hover{background:var(--accent);color:white}
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px;padding:80px 0}
.feature-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:32px;transition:all .3s}
.feature-card:hover{transform:translateY(-4px);border-color:var(--accent)}
.feature-icon{font-size:2.5rem;margin-bottom:16px}
.feature-card h3{font-size:1.25rem;margin-bottom:8px}
.feature-card p{color:var(--muted)}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;padding:60px 0;text-align:center;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.stat h2{font-size:2.5rem;font-weight:800;color:var(--accent)}
.stat p{color:var(--muted);margin-top:4px}
.testimonials{padding:80px 0}
.testimonials h2{text-align:center;font-size:2rem;margin-bottom:48px}
.testimonial-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
.testimonial{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:32px}
.testimonial p{font-style:italic;margin-bottom:16px;color:var(--muted)}
.testimonial .author{font-weight:600;color:var(--fg)}
.cta-section{text-align:center;padding:100px 0;background:linear-gradient(135deg,rgba(99,102,241,.1),rgba(168,85,247,.1));border-radius:32px;margin:40px 0}
.cta-section h2{font-size:2.5rem;margin-bottom:16px}
.cta-section p{color:var(--muted);margin-bottom:32px}
footer{text-align:center;padding:40px 0;color:var(--muted);font-size:.9rem;border-top:1px solid var(--border)}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.hero,.features,.stats,.testimonials,.cta-section{animation:fadeUp .8s ease-out both}
.features{animation-delay:.2s}.stats{animation-delay:.3s}
</style>
</head>
<body>
<div class="container">
<nav><div class="logo">✦ Brand</div><ul class="nav-links"><li><a href="#">Product</a></li><li><a href="#">Pricing</a></li><li><a href="#">Docs</a></li><li><a href="#">Blog</a></li></ul></nav>
<section class="hero"><h1>${title}</h1><p>${subtitle}</p><a href="#" class="btn">${cta}</a> <a href="#" class="btn btn-outline" style="margin-left:12px">Learn More</a></section>
<section class="features">
<div class="feature-card"><div class="feature-icon">⚡</div><h3>Lightning Fast</h3><p>Built for speed. Every interaction feels instant, every page loads in milliseconds.</p></div>
<div class="feature-card"><div class="feature-icon">🔒</div><h3>Enterprise Security</h3><p>SOC2 compliant, end-to-end encryption, and role-based access control out of the box.</p></div>
<div class="feature-card"><div class="feature-icon">🔌</div><h3>200+ Integrations</h3><p>Connect with every tool your team already uses. Slack, GitHub, Jira, and more.</p></div>
<div class="feature-card"><div class="feature-icon">📊</div><h3>Real-time Analytics</h3><p>Understand your users with beautiful dashboards and actionable insights.</p></div>
<div class="feature-card"><div class="feature-icon">🤖</div><h3>AI-Powered</h3><p>Smart suggestions, automated workflows, and intelligent error detection.</p></div>
<div class="feature-card"><div class="feature-icon">🌍</div><h3>Global Scale</h3><p>Deploy to 40+ regions worldwide. Serve millions with 99.99% uptime.</p></div>
</section>
<section class="stats"><div class="stat"><h2>10K+</h2><p>Active Teams</p></div><div class="stat"><h2>99.9%</h2><p>Uptime SLA</p></div><div class="stat"><h2>50M+</h2><p>API Calls/Day</p></div><div class="stat"><h2>4.9★</h2><p>User Rating</p></div></section>
<section class="testimonials"><h2>Loved by Teams Worldwide</h2><div class="testimonial-grid">
<div class="testimonial"><p>"This transformed how our engineering team works. We shipped 3x faster in the first month."</p><div class="author">— Sarah Chen, CTO at TechFlow</div></div>
<div class="testimonial"><p>"The best investment we made this year. ROI was visible within weeks."</p><div class="author">— Marcus Johnson, VP Engineering at Scale</div></div>
<div class="testimonial"><p>"Finally, a tool that developers actually enjoy using. The DX is unmatched."</p><div class="author">— Priya Patel, Lead Dev at CloudNine</div></div>
</div></section>
<section class="cta-section"><h2>Ready to Transform Your Workflow?</h2><p>Join thousands of teams already shipping faster.</p><a href="#" class="btn">Start Free Trial</a></section>
<footer><p>© 2026 Brand. All rights reserved. · Privacy · Terms · Status</p></footer>
</div>
</body>
</html>`;
    }
  },

  dashboard: {
    name: 'Analytics Dashboard',
    generate(opts = {}) {
      const { theme = 'dark', title = 'Analytics Dashboard' } = opts;
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:${theme === 'dark' ? '#0f0f17' : '#f5f5f5'};--sidebar:${theme === 'dark' ? '#141420' : '#ffffff'};--card:${theme === 'dark' ? '#1a1a2e' : '#ffffff'};--fg:${theme === 'dark' ? '#e5e5ef' : '#1a1a2e'};--muted:${theme === 'dark' ? '#6b7280' : '#9ca3af'};--accent:#6366f1;--green:#22c55e;--red:#ef4444;--orange:#f59e0b;--border:${theme === 'dark' ? '#1e1e30' : '#e5e7eb'}}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--fg);display:flex;min-height:100vh}
.sidebar{width:240px;background:var(--sidebar);border-right:1px solid var(--border);padding:20px;display:flex;flex-direction:column}
.sidebar .logo{font-size:1.3rem;font-weight:800;margin-bottom:32px;background:linear-gradient(135deg,var(--accent),#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sidebar nav a{display:flex;align-items:center;gap:12px;padding:10px 12px;color:var(--muted);text-decoration:none;border-radius:8px;margin-bottom:4px;transition:all .2s}
.sidebar nav a:hover,.sidebar nav a.active{background:rgba(99,102,241,.1);color:var(--accent)}
.main{flex:1;padding:24px;overflow-y:auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.header h1{font-size:1.5rem}
.header .search{padding:8px 16px;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--fg);width:300px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.stat-card .label{color:var(--muted);font-size:.85rem;margin-bottom:4px}
.stat-card .value{font-size:1.8rem;font-weight:700}
.stat-card .trend{font-size:.85rem;margin-top:4px}
.stat-card .trend.up{color:var(--green)}
.stat-card .trend.down{color:var(--red)}
.charts{display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:24px}
.chart-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.chart-card h3{margin-bottom:16px;font-size:1rem}
.bar-chart{display:flex;align-items:flex-end;gap:8px;height:200px;padding-top:20px}
.bar{flex:1;background:linear-gradient(to top,var(--accent),#818cf8);border-radius:4px 4px 0 0;transition:all .3s;position:relative}
.bar:hover{opacity:.8}
.bar::after{content:attr(data-value);position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:.75rem;color:var(--muted)}
.donut{width:180px;height:180px;border-radius:50%;background:conic-gradient(var(--accent) 0% 42%,#818cf8 42% 68%,#a855f7 68% 85%,var(--muted) 85% 100%);margin:0 auto;position:relative}
.donut::after{content:'';position:absolute;inset:30px;background:var(--card);border-radius:50%}
.donut-legend{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.donut-legend span{font-size:.8rem;color:var(--muted)}
.donut-legend span::before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;background:var(--accent)}
.table-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.table-card h3{margin-bottom:16px}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:10px;color:var(--muted);font-size:.85rem;border-bottom:1px solid var(--border)}
td{padding:10px;border-bottom:1px solid var(--border)}
.badge{padding:2px 8px;border-radius:9999px;font-size:.75rem;font-weight:600}
.badge-success{background:rgba(34,197,94,.15);color:var(--green)}
.badge-warning{background:rgba(245,158,11,.15);color:var(--orange)}
.badge-error{background:rgba(239,68,68,.15);color:var(--red)}
@media(max-width:768px){.sidebar{display:none}.stats-grid{grid-template-columns:repeat(2,1fr)}.charts{grid-template-columns:1fr}}
</style>
</head>
<body>
<aside class="sidebar"><div class="logo">✦ Analytics</div><nav>
<a href="#" class="active">📊 Dashboard</a><a href="#">👥 Users</a><a href="#">📦 Products</a><a href="#">💳 Revenue</a><a href="#">📈 Reports</a><a href="#">⚙️ Settings</a>
</nav></aside>
<main class="main">
<div class="header"><h1>Dashboard</h1><input class="search" placeholder="Search..."></div>
<div class="stats-grid">
<div class="stat-card"><div class="label">Total Revenue</div><div class="value">$48,295</div><div class="trend up">↑ 12.5% vs last month</div></div>
<div class="stat-card"><div class="label">Active Users</div><div class="value">12,847</div><div class="trend up">↑ 8.2% vs last month</div></div>
<div class="stat-card"><div class="label">Conversion Rate</div><div class="value">3.24%</div><div class="trend down">↓ 0.4% vs last month</div></div>
<div class="stat-card"><div class="label">Avg. Session</div><div class="value">4m 32s</div><div class="trend up">↑ 15s vs last month</div></div>
</div>
<div class="charts">
<div class="chart-card"><h3>Revenue (Last 12 Months)</h3><div class="bar-chart">
<div class="bar" style="height:45%" data-value="$28k"></div><div class="bar" style="height:52%" data-value="$32k"></div>
<div class="bar" style="height:48%" data-value="$30k"></div><div class="bar" style="height:65%" data-value="$40k"></div>
<div class="bar" style="height:58%" data-value="$36k"></div><div class="bar" style="height:72%" data-value="$44k"></div>
<div class="bar" style="height:68%" data-value="$42k"></div><div class="bar" style="height:78%" data-value="$48k"></div>
<div class="bar" style="height:70%" data-value="$43k"></div><div class="bar" style="height:82%" data-value="$50k"></div>
<div class="bar" style="height:75%" data-value="$46k"></div><div class="bar" style="height:90%" data-value="$55k"></div>
</div></div>
<div class="chart-card"><h3>Traffic Sources</h3><div class="donut"></div><div class="donut-legend"><span>Direct 42%</span><span>Organic 26%</span><span>Social 17%</span><span>Other 15%</span></div></div>
</div>
<div class="table-card"><h3>Recent Transactions</h3><table>
<thead><tr><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
<tbody>
<tr><td>Alice Johnson</td><td>$299.00</td><td><span class="badge badge-success">Completed</span></td><td>May 3, 2026</td></tr>
<tr><td>Bob Smith</td><td>$149.00</td><td><span class="badge badge-warning">Pending</span></td><td>May 3, 2026</td></tr>
<tr><td>Carol White</td><td>$499.00</td><td><span class="badge badge-success">Completed</span></td><td>May 2, 2026</td></tr>
<tr><td>David Lee</td><td>$89.00</td><td><span class="badge badge-error">Failed</span></td><td>May 2, 2026</td></tr>
<tr><td>Eva Martinez</td><td>$199.00</td><td><span class="badge badge-success">Completed</span></td><td>May 1, 2026</td></tr>
</tbody></table></div>
</main>
</body>
</html>`;
    }
  },

  pricing: {
    name: 'Pricing Page',
    generate(opts = {}) {
      const { theme = 'dark' } = opts;
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pricing</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:${theme === 'dark' ? '#0a0a0f' : '#fff'};--fg:${theme === 'dark' ? '#f0f0f5' : '#1a1a2e'};--muted:${theme === 'dark' ? '#6b7280' : '#9ca3af'};--card:${theme === 'dark' ? '#141420' : '#f8f9fa'};--border:${theme === 'dark' ? '#1e1e30' : '#e5e7eb'};--accent:#6366f1}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6}
.container{max-width:1100px;margin:0 auto;padding:60px 24px}
h1{text-align:center;font-size:2.5rem;margin-bottom:8px}
.subtitle{text-align:center;color:var(--muted);margin-bottom:40px}
.toggle-wrap{display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:48px}
.toggle{position:relative;width:48px;height:26px;background:var(--border);border-radius:13px;cursor:pointer;transition:.3s}
.toggle.active{background:var(--accent)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;background:white;border-radius:50%;transition:.3s}
.toggle.active::after{left:25px}
.save-badge{background:var(--accent);color:white;padding:2px 8px;border-radius:9999px;font-size:.75rem;font-weight:600}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.plan{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:32px;text-align:center;transition:all .3s;position:relative}
.plan.popular{border-color:var(--accent);transform:scale(1.05)}
.plan.popular::before{content:'Most Popular';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--accent);color:white;padding:4px 16px;border-radius:9999px;font-size:.75rem;font-weight:600}
.plan h3{font-size:1.25rem;margin-bottom:8px}
.price{font-size:3rem;font-weight:800;margin:16px 0}
.price span{font-size:1rem;font-weight:400;color:var(--muted)}
.features-list{list-style:none;text-align:left;margin:24px 0;padding:0}
.features-list li{padding:8px 0;color:var(--muted);border-bottom:1px solid var(--border)}
.features-list li::before{content:'✓ ';color:var(--accent);font-weight:700}
.btn{display:block;width:100%;padding:14px;background:var(--accent);color:white;border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.3)}
.btn-outline{background:transparent;border:2px solid var(--accent);color:var(--accent)}
.btn-outline:hover{background:var(--accent);color:white}
.faq{margin-top:80px}
.faq h2{text-align:center;margin-bottom:32px}
.faq-item{background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:12px;overflow:hidden}
.faq-q{padding:16px 20px;cursor:pointer;display:flex;justify-content:space-between;font-weight:600}
.faq-a{padding:0 20px 16px;color:var(--muted);display:none}
.faq-item.open .faq-a{display:block}
@media(max-width:768px){.grid{grid-template-columns:1fr}.plan.popular{transform:none}}
</style>
</head>
<body>
<div class="container">
<h1>Simple, Transparent Pricing</h1>
<p class="subtitle">Start free, scale as you grow. No hidden fees.</p>
<div class="toggle-wrap"><span>Monthly</span><div class="toggle" onclick="this.classList.toggle('active');document.querySelectorAll('.amt').forEach(e=>e.textContent=this.classList.contains('active')?e.dataset.yearly:e.dataset.monthly)"></div><span>Yearly</span><span class="save-badge">Save 20%</span></div>
<div class="grid">
<div class="plan"><h3>Starter</h3><p class="price">$<span class="amt" data-monthly="0" data-yearly="0">0</span><span>/mo</span></p><ul class="features-list"><li>1 user</li><li>5 projects</li><li>1GB storage</li><li>Community support</li><li>Basic analytics</li></ul><button class="btn btn-outline">Get Started</button></div>
<div class="plan popular"><h3>Pro</h3><p class="price">$<span class="amt" data-monthly="29" data-yearly="23">29</span><span>/mo</span></p><ul class="features-list"><li>10 users</li><li>Unlimited projects</li><li>100GB storage</li><li>Priority support</li><li>Advanced analytics</li><li>API access</li><li>Custom domains</li></ul><button class="btn">Start Free Trial</button></div>
<div class="plan"><h3>Enterprise</h3><p class="price">$<span class="amt" data-monthly="99" data-yearly="79">99</span><span>/mo</span></p><ul class="features-list"><li>Unlimited users</li><li>Unlimited everything</li><li>1TB storage</li><li>24/7 dedicated support</li><li>SSO & SAML</li><li>Custom integrations</li><li>SLA guarantee</li><li>On-premise option</li></ul><button class="btn btn-outline">Contact Sales</button></div>
</div>
<div class="faq"><h2>Frequently Asked Questions</h2>
<div class="faq-item open"><div class="faq-q" onclick="this.parentElement.classList.toggle('open')">Can I change plans later? <span>+</span></div><div class="faq-a">Yes! Upgrade or downgrade anytime. Changes take effect immediately with prorated billing.</div></div>
<div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle('open')">Is there a free trial? <span>+</span></div><div class="faq-a">Yes, all paid plans come with a 14-day free trial. No credit card required.</div></div>
<div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle('open')">What payment methods do you accept? <span>+</span></div><div class="faq-a">We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.</div></div>
</div>
</div>
</body>
</html>`;
    }
  },

  error404: {
    name: '404 Error Page',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>404 - Not Found</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0f;color:#f0f0f5;display:flex;align-items:center;justify-content:center;min-height:100vh;overflow:hidden}
.container{text-align:center;position:relative}
.code{font-size:clamp(8rem,20vw,15rem);font-weight:900;background:linear-gradient(135deg,#6366f1,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;animation:pulse 3s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}
h1{font-size:2rem;margin:16px 0 8px}
p{color:#6b7280;margin-bottom:32px;font-size:1.1rem}
.search-box{display:flex;max-width:400px;margin:0 auto 32px}
.search-box input{flex:1;padding:12px 16px;background:#141420;border:1px solid #1e1e30;border-right:none;border-radius:12px 0 0 12px;color:#f0f0f5;font-size:1rem}
.search-box button{padding:12px 20px;background:#6366f1;border:none;border-radius:0 12px 12px 0;color:white;font-weight:600;cursor:pointer}
.ghost{font-size:6rem;animation:float 4s ease-in-out infinite;position:absolute;top:-60px;right:-80px;opacity:.15}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
a{color:#6366f1;text-decoration:none;font-weight:600}
a:hover{text-decoration:underline}
.links{margin-top:24px;display:flex;gap:24px;justify-content:center}
</style>
</head>
<body>
<div class="container">
<div class="ghost">👻</div>
<div class="code">404</div>
<h1>Lost in the void</h1>
<p>The page you're looking for has vanished into thin air.</p>
<div class="search-box"><input placeholder="Search for something..." type="text"><button>Search</button></div>
<div class="links"><a href="/">← Go Home</a><a href="/support">Contact Support</a><a href="/status">Check Status</a></div>
</div>
</body>
</html>`;
    }
  },

  chat: {
    name: 'Chat Interface',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chat</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f17;color:#e5e5ef;display:flex;height:100vh}
.sidebar{width:280px;background:#141420;border-right:1px solid #1e1e30;display:flex;flex-direction:column}
.sidebar-header{padding:16px;border-bottom:1px solid #1e1e30}
.sidebar-header input{width:100%;padding:8px 12px;background:#1a1a2e;border:1px solid #1e1e30;border-radius:8px;color:#e5e5ef}
.chat-list{flex:1;overflow-y:auto}
.chat-item{padding:12px 16px;cursor:pointer;border-bottom:1px solid #1e1e30;transition:.2s}
.chat-item:hover,.chat-item.active{background:#1a1a2e}
.chat-item .name{font-weight:600;font-size:.9rem}
.chat-item .preview{color:#6b7280;font-size:.8rem;margin-top:2px}
.main{flex:1;display:flex;flex-direction:column}
.chat-header{padding:16px;border-bottom:1px solid #1e1e30;display:flex;align-items:center;gap:12px}
.avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem}
.messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:12px}
.msg{max-width:70%;padding:10px 16px;border-radius:16px;font-size:.95rem;line-height:1.5;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.msg.received{background:#1a1a2e;align-self:flex-start;border-bottom-left-radius:4px}
.msg.sent{background:#6366f1;align-self:flex-end;border-bottom-right-radius:4px}
.msg .time{font-size:.7rem;color:#6b7280;margin-top:4px}
.msg.sent .time{color:rgba(255,255,255,.6)}
.typing{display:flex;gap:4px;padding:10px 16px;background:#1a1a2e;border-radius:16px;width:fit-content;align-self:flex-start}
.typing span{width:8px;height:8px;background:#6b7280;border-radius:50%;animation:bounce .6s infinite alternate}
.typing span:nth-child(2){animation-delay:.2s}
.typing span:nth-child(3){animation-delay:.4s}
@keyframes bounce{to{opacity:.3;transform:translateY(-4px)}}
.input-area{padding:16px;border-top:1px solid #1e1e30;display:flex;gap:8px}
.input-area input{flex:1;padding:12px 16px;background:#1a1a2e;border:1px solid #1e1e30;border-radius:24px;color:#e5e5ef;font-size:.95rem}
.input-area button{padding:12px 24px;background:#6366f1;border:none;border-radius:24px;color:white;font-weight:600;cursor:pointer;transition:.2s}
.input-area button:hover{background:#5558e6}
.online{width:10px;height:10px;background:#22c55e;border-radius:50%;display:inline-block}
</style>
</head>
<body>
<aside class="sidebar"><div class="sidebar-header"><input placeholder="Search conversations..."></div>
<div class="chat-list">
<div class="chat-item active"><div class="name">Alice Johnson</div><div class="preview">Hey! How's the project going?</div></div>
<div class="chat-item"><div class="name">Design Team</div><div class="preview">Sarah: Updated the mockups ✨</div></div>
<div class="chat-item"><div class="name">Bob Smith</div><div class="preview">Can we sync tomorrow?</div></div>
<div class="chat-item"><div class="name">Engineering</div><div class="preview">Marcus: Deployed to staging 🚀</div></div>
</div></aside>
<main class="main">
<div class="chat-header"><div class="avatar">AJ</div><div><strong>Alice Johnson</strong><br><span class="online"></span> Online</div></div>
<div class="messages">
<div class="msg received">Hey! How's the project going? 😊<div class="time">2:30 PM</div></div>
<div class="msg sent">Pretty good! Just finished the API integration.<div class="time">2:31 PM</div></div>
<div class="msg received">That's awesome! Can you share the docs?<div class="time">2:31 PM</div></div>
<div class="msg sent">Sure, I'll send them over in a bit. Want me to walk you through it too?<div class="time">2:32 PM</div></div>
<div class="msg received">Yes please! That would be super helpful 🙏<div class="time">2:32 PM</div></div>
<div class="msg sent">Cool, let's do 3pm? I'll set up a quick call.<div class="time">2:33 PM</div></div>
<div class="msg received">Perfect, see you then! 🎉<div class="time">2:33 PM</div></div>
<div class="typing"><span></span><span></span><span></span></div>
</div>
<div class="input-area"><input placeholder="Type a message..." id="msgInput"><button onclick="sendMsg()">Send</button></div>
</main>
<script>
function sendMsg(){
const input=document.getElementById('msgInput');
if(!input.value.trim())return;
const msgs=document.querySelector('.messages');
const typing=msgs.querySelector('.typing');
const div=document.createElement('div');
div.className='msg sent';
div.innerHTML=input.value+'<div class="time">'+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})+'</div>';
msgs.insertBefore(div,typing);
input.value='';
msgs.scrollTop=msgs.scrollHeight;
}
document.getElementById('msgInput').addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg()});
</script>
</body>
</html>`;
    }
  },

  form: {
    name: 'Multi-step Form',
    generate(opts = {}) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign Up</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0f;color:#f0f0f5;display:flex;align-items:center;justify-content:center;min-height:100vh}
.card{background:#141420;border:1px solid #1e1e30;border-radius:20px;padding:40px;width:100%;max-width:480px}
h1{font-size:1.5rem;margin-bottom:8px}
.subtitle{color:#6b7280;margin-bottom:32px}
.progress{display:flex;gap:8px;margin-bottom:32px}
.progress .step{flex:1;height:4px;background:#1e1e30;border-radius:2px;transition:.3s}
.progress .step.active{background:#6366f1}
.progress .step.done{background:#22c55e}
.field{margin-bottom:20px}
.field label{display:block;font-size:.85rem;color:#9ca3af;margin-bottom:6px}
.field input,.field select,.field textarea{width:100%;padding:12px 16px;background:#1a1a2e;border:1px solid #1e1e30;border-radius:10px;color:#f0f0f5;font-size:.95rem;transition:border-color .2s}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:#6366f1}
.field .error{color:#ef4444;font-size:.8rem;margin-top:4px;display:none}
.field.invalid .error{display:block}
.field.invalid input{border-color:#ef4444}
.btn-row{display:flex;gap:12px;margin-top:32px}
.btn{flex:1;padding:14px;border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s}
.btn-primary{background:#6366f1;color:white}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.3)}
.btn-secondary{background:#1e1e30;color:#9ca3af}
.step-content{display:none}
.step-content.active{display:block;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.success{text-align:center;padding:40px 0}
.success .icon{font-size:4rem;margin-bottom:16px}
.strength{height:4px;background:#1e1e30;border-radius:2px;margin-top:8px;overflow:hidden}
.strength-bar{height:100%;border-radius:2px;transition:all .3s;width:0}
</style>
</head>
<body>
<div class="card">
<h1>Create Account</h1>
<p class="subtitle">Step <span id="stepNum">1</span> of 3</p>
<div class="progress"><div class="step active"></div><div class="step"></div><div class="step"></div></div>

<div class="step-content active" id="step1">
<div class="field"><label>Full Name</label><input type="text" placeholder="John Doe" id="name"><div class="error">Name is required</div></div>
<div class="field"><label>Email</label><input type="email" placeholder="john@example.com" id="email"><div class="error">Valid email required</div></div>
<div class="field"><label>Password</label><input type="password" placeholder="Min 8 characters" id="password" oninput="checkStrength()"><div class="strength"><div class="strength-bar" id="strengthBar"></div></div><div class="error">Min 8 characters required</div></div>
<div class="btn-row"><button class="btn btn-primary" onclick="nextStep(1)">Continue →</button></div>
</div>

<div class="step-content" id="step2">
<div class="field"><label>Company</label><input type="text" placeholder="Acme Inc"></div>
<div class="field"><label>Role</label><select><option>Developer</option><option>Designer</option><option>Manager</option><option>Other</option></select></div>
<div class="field"><label>How did you hear about us?</label><select><option>Google</option><option>Twitter</option><option>Friend</option><option>Other</option></select></div>
<div class="btn-row"><button class="btn btn-secondary" onclick="prevStep(2)">← Back</button><button class="btn btn-primary" onclick="nextStep(2)">Continue →</button></div>
</div>

<div class="step-content" id="step3">
<div class="field"><label>Profile Picture</label><input type="file" accept="image/*" style="padding:10px"></div>
<div class="field"><label>Bio</label><textarea rows="3" placeholder="Tell us about yourself..."></textarea></div>
<div class="field"><label><input type="checkbox"> I agree to the Terms of Service</label></div>
<div class="btn-row"><button class="btn btn-secondary" onclick="prevStep(3)">← Back</button><button class="btn btn-primary" onclick="finish()">Create Account 🎉</button></div>
</div>

<div class="step-content" id="success">
<div class="success"><div class="icon">🎉</div><h2>Welcome aboard!</h2><p style="color:#6b7280;margin-top:8px">Your account has been created successfully.</p></div>
</div>
</div>
<script>
let current=1;
function showStep(n){
document.querySelectorAll('.step-content').forEach(e=>e.classList.remove('active'));
document.getElementById('step'+n).classList.add('active');
document.querySelectorAll('.progress .step').forEach((e,i)=>{e.className='step'+(i<n-1?' done':i===n-1?' active':'')});
document.getElementById('stepNum').textContent=n;
}
function nextStep(n){if(n<3)showStep(n+1)}
function prevStep(n){if(n>1)showStep(n-1)}
function finish(){showStep(4);document.querySelector('.progress').style.display='none';document.querySelector('.subtitle').style.display='none'}
function checkStrength(){
const p=document.getElementById('password').value;
const bar=document.getElementById('strengthBar');
let s=0;if(p.length>=8)s++;if(/[A-Z]/.test(p))s++;if(/[0-9]/.test(p))s++;if(/[^A-Za-z0-9]/.test(p))s++;
bar.style.width=(s*25)+'%';
bar.style.background=['#ef4444','#f59e0b','#22c55e','#22c55e'][s-1]||'transparent';
}
</script>
</body>
</html>`;
    }
  }
};

class TemplateEngine {
  constructor() {
    this.templates = TEMPLATES;
  }

  list() {
    return Object.entries(this.templates).map(([id, t]) => ({ id, name: t.name }));
  }

  get(id) {
    return this.templates[id] || null;
  }

  generate(id, opts = {}) {
    const template = this.templates[id];
    if (!template) throw new Error(`Template not found: ${id}`);
    return template.generate(opts);
  }

  /**
   * Match a prompt to the best template
   */
  match(prompt) {
    const lower = prompt.toLowerCase();
    const matches = {
      landing: ['landing', 'homepage', 'hero', 'startup', 'saas'],
      dashboard: ['dashboard', 'admin', 'analytics', 'stats'],
      pricing: ['pricing', 'price', 'plan', 'subscription'],
      error404: ['404', 'error', 'not found', 'maintenance'],
      chat: ['chat', 'message', 'messenger', 'conversation'],
      form: ['form', 'signup', 'register', 'wizard', 'survey']
    };

    for (const [id, keywords] of Object.entries(matches)) {
      if (keywords.some(k => lower.includes(k))) return id;
    }
    return 'landing';
  }
}

module.exports = new TemplateEngine();
module.exports.TemplateEngine = TemplateEngine;
module.exports.TEMPLATES = TEMPLATES;
