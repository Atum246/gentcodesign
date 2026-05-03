/**
 * GentCoDesign - Utility Functions
 * Color generation, typography, accessibility, SEO helpers
 */

class Utilities {
  // ═══════════════════════════════════════════════════════════
  // Color Utilities
  // ═══════════════════════════════════════════════════════════

  /**
   * Generate a harmonious color palette from a base color
   */
  static generatePalette(baseColor, scheme = 'analogous') {
    const hsl = Utilities.hexToHSL(baseColor);
    const palettes = {
      analogous: [
        hsl,
        { h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l },
        { h: (hsl.h + 60) % 360, s: hsl.s, l: hsl.l },
        { h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l },
        { h: (hsl.h - 60 + 360) % 360, s: hsl.s, l: hsl.l }
      ],
      complementary: [
        hsl,
        { h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l },
        { h: hsl.h, s: hsl.s * 0.7, l: hsl.l + 20 },
        { h: (hsl.h + 180) % 360, s: hsl.s * 0.7, l: hsl.l + 20 },
        { h: hsl.h, s: hsl.s * 0.5, l: hsl.l + 30 }
      ],
      triadic: [
        hsl,
        { h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l },
        { h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l },
        { h: hsl.h, s: hsl.s * 0.6, l: hsl.l + 20 },
        { h: (hsl.h + 120) % 360, s: hsl.s * 0.6, l: hsl.l + 20 }
      ],
      monochromatic: [
        hsl,
        { h: hsl.h, s: hsl.s, l: Math.min(hsl.l + 15, 95) },
        { h: hsl.h, s: hsl.s, l: Math.min(hsl.l + 30, 95) },
        { h: hsl.h, s: hsl.s * 0.8, l: Math.max(hsl.l - 15, 5) },
        { h: hsl.h, s: hsl.s * 0.6, l: Math.max(hsl.l - 30, 5) }
      ]
    };

    return (palettes[scheme] || palettes.analogous).map(hsl => Utilities.hslToHex(hsl));
  }

  /**
   * Generate a complete design token set
   */
  static generateDesignTokens(accent = '#6366f1', theme = 'dark') {
    const palette = Utilities.generatePalette(accent);
    const isDark = theme === 'dark';

    return {
      colors: {
        primary: accent,
        primaryLight: palette[1],
        primaryDark: palette[3],
        secondary: palette[1],
        accent: palette[2],
        bg: isDark ? '#0a0a0f' : '#ffffff',
        surface: isDark ? '#141420' : '#f8f9fa',
        card: isDark ? '#1a1a2e' : '#ffffff',
        fg: isDark ? '#f0f0f5' : '#1a1a2e',
        muted: isDark ? '#6b7280' : '#9ca3af',
        border: isDark ? '#1e1e30' : '#e5e7eb',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
      },
      typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontFamilyMono: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '2rem', '4xl': '2.5rem', '5xl': '3.5rem' },
        fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
        lineHeight: { tight: 1.1, snug: 1.3, normal: 1.6, relaxed: 1.8 }
      },
      spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px', '4xl': '96px' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', full: '9999px' },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.1)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.1)',
        glow: `0 0 20px ${accent}40`
      },
      transitions: {
        fast: '0.15s ease',
        normal: '0.2s ease',
        slow: '0.3s ease',
        spring: '0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    };
  }

  static hexToHSL(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
      h *= 360;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  static hslToHex({ h, s, l }) {
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // ═══════════════════════════════════════════════════════════
  // Accessibility
  // ═══════════════════════════════════════════════════════════

  /**
   * Check color contrast ratio (WCAG)
   */
  static contrastRatio(color1, color2) {
    const lum1 = Utilities.relativeLuminance(color1);
    const lum2 = Utilities.relativeLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  static relativeLuminance(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const toLinear = v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  /**
   * Check WCAG compliance
   */
  static checkWCAG(fg, bg) {
    const ratio = Utilities.contrastRatio(fg, bg);
    return {
      ratio: Math.round(ratio * 100) / 100,
      AA: ratio >= 4.5,
      AALarge: ratio >= 3,
      AAA: ratio >= 7,
      AAALarge: ratio >= 4.5
    };
  }

  // ═══════════════════════════════════════════════════════════
  // CSS Utilities
  // ═══════════════════════════════════════════════════════════

  /**
   * Generate CSS custom properties from design tokens
   */
  static tokensToCSS(tokens) {
    let css = ':root {\n';
    for (const [group, values] of Object.entries(tokens)) {
      if (typeof values === 'object' && !Array.isArray(values)) {
        for (const [key, value] of Object.entries(values)) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            for (const [subKey, subValue] of Object.entries(value)) {
              css += `  --${group}-${key}-${subKey}: ${subValue};\n`;
            }
          } else {
            css += `  --${group}-${key}: ${value};\n`;
          }
        }
      }
    }
    css += '}';
    return css;
  }

  /**
   * Generate a responsive CSS grid
   */
  static responsiveGrid(columns = 3, gap = '24px', minWidth = '280px') {
    return `display: grid; grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr)); gap: ${gap};`;
  }

  // ═══════════════════════════════════════════════════════════
  // Content Utilities
  // ═══════════════════════════════════════════════════════════

  /**
   * Generate realistic placeholder content
   */
  static lorem(paragraphs = 1) {
    const texts = [
      'Build better products with our comprehensive suite of tools designed for modern teams. From ideation to deployment, we\'ve got you covered.',
      'Transform your workflow with intelligent automation. Our platform learns from your patterns and suggests optimizations that save hours every week.',
      'Join thousands of teams who have already made the switch. Experience the difference that thoughtful design and powerful engineering can make.',
      'Your data, your rules. Enterprise-grade security meets intuitive design. SOC2 certified, GDPR compliant, and built with privacy at its core.',
      'Scale without limits. Whether you\'re a startup of five or an enterprise of fifty thousand, our platform grows with you seamlessly.',
      'Real-time collaboration that actually works. No more version conflicts, no more lost changes. Just smooth, synchronized teamwork.',
      'Insights that matter. Our analytics dashboard cuts through the noise and shows you exactly what you need to know to make better decisions.',
      'Integrate with everything. Connect to 200+ tools your team already uses. Slack, GitHub, Jira, Figma — if it has an API, we connect to it.'
    ];
    return Array.from({ length: paragraphs }, (_, i) => texts[i % texts.length]).join('\n\n');
  }

  /**
   * Generate realistic names
   */
  static randomName() {
    const first = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack', 'Kara', 'Leo', 'Maya', 'Noah', 'Olivia', 'Paul'];
    const last = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Chen', 'Kim', 'Patel', 'Singh'];
    return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
  }

  /**
   * Generate realistic stats
   */
  static randomStats(count = 4) {
    const stats = [
      { label: 'Active Users', value: '12,847', trend: '+8.2%' },
      { label: 'Revenue', value: '$48,295', trend: '+12.5%' },
      { label: 'Conversion', value: '3.24%', trend: '-0.4%' },
      { label: 'Avg. Session', value: '4m 32s', trend: '+15s' },
      { label: 'Page Views', value: '284K', trend: '+22%' },
      { label: 'Bounce Rate', value: '34.2%', trend: '-2.1%' },
      { label: 'NPS Score', value: '72', trend: '+5' },
      { label: 'Uptime', value: '99.99%', trend: '+0.01%' }
    ];
    return stats.slice(0, count);
  }
}

module.exports = Utilities;
