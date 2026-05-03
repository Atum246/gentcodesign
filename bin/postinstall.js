#!/usr/bin/env node

/**
 * GentCoDesign - Postinstall branding
 * Shows a clean centered red logo after npm install
 */

const RED = '\x1b[31m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const WHITE = '\x1b[37m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';

// Get terminal width, default 80
const cols = (process.stdout.columns || 80);

function center(text) {
  // Strip ANSI codes for width calculation
  const stripped = text.replace(/\x1b\[[0-9;]*m/g, '');
  const pad = Math.max(0, Math.floor((cols - stripped.length) / 2));
  return ' '.repeat(pad) + text;
}

function hr() {
  const line = '─'.repeat(Math.min(56, cols - 4));
  return center(`${DIM}${line}${RESET}`);
}

const lines = [
  '',
  `${RED}${BOLD}     ██████╗ ██████╗██████╗ ${RESET}`,
  `${RED}${BOLD}    ██╔════╝██╔════╝██╔══██╗${RESET}`,
  `${RED}${BOLD}    ██║     ██║     ██║  ██║${RESET}`,
  `${RED}${BOLD}    ██║     ██║     ██║  ██║${RESET}`,
  `${RED}${BOLD}    ╚██████╗╚██████╗██████╔╝${RESET}`,
  `${RED}${BOLD}     ╚═════╝ ╚═════╝╚═════╝ ${RESET}`,
  '',
  `${RED}${BOLD}    ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗${RESET}`,
  `${RED}${BOLD}    ██╔══██╗██╔════╝██╔════╝██║██╔═══██╗████╗  ██║${RESET}`,
  `${RED}${BOLD}    ██║  ██║█████╗  ███████╗██║██║   ██║██╔██╗ ██║${RESET}`,
  `${RED}${BOLD}    ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║${RESET}`,
  `${RED}${BOLD}    ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║${RESET}`,
  `${RED}${BOLD}    ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝${RESET}`,
  '',
  `${WHITE}${BOLD}      Agent-Native AI Design Engine${RESET}`,
  '',
  hr(),
  '',
  `${CYAN}      🎨  26 Design Skills${RESET}`,
  `${CYAN}      ⚡  12 Instant Templates${RESET}`,
  `${CYAN}      🤖  20 Model Providers${RESET}`,
  `${CYAN}      📤  6 Export Formats${RESET}`,
  '',
  hr(),
  '',
  `${WHITE}      Quick Start:${RESET}`,
  '',
  `${DIM}      $${RESET} ${BOLD}gentcodesign config --set-key openai=sk-xxx${RESET}`,
  `${DIM}      $${RESET} ${BOLD}gentcodesign generate "landing page"${RESET}`,
  '',
  `${DIM}      Instant templates (no API key needed):${RESET}`,
  '',
  `${DIM}      $${RESET} ${BOLD}gentcodesign template landing${RESET}`,
  `${DIM}      $${RESET} ${BOLD}gentcodesign template dashboard${RESET}`,
  '',
  hr(),
  '',
  `${RED}      ⭐  GitHub: ${WHITE}https://github.com/Atum246/gentcodesign${RESET}`,
  `${RED}      📦  npm:    ${WHITE}npmjs.com/package/gentcodesign${RESET}`,
  '',
  hr(),
  ''
];

for (const line of lines) {
  console.log(center(line));
}
