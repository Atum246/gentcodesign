#!/usr/bin/env node

/**
 * GentCoDesign - Postinstall branding
 * Shows a clean centered red logo in a box after npm install
 */

const RED = '\x1b[31m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const WHITE = '\x1b[37m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const cols = process.stdout.columns || 80;
const inner = cols - 6;

function stripAnsi(s) { return s.replace(/\x1b\[[0-9;]*m/g, ''); }

function boxLine(text) {
  const raw = stripAnsi(text);
  const pad = Math.max(0, inner - raw.length);
  console.log(`${DIM}   │${RESET} ${text}${' '.repeat(pad)} ${DIM}│${RESET}`);
}

function boxEmpty() {
  console.log(`${DIM}   │${RESET}${' '.repeat(inner)} ${DIM}│${RESET}`);
}

function boxTop() {
  console.log(`${DIM}   ┌${'─'.repeat(inner)}┐${RESET}`);
}

function boxBot() {
  console.log(`${DIM}   └${'─'.repeat(inner)}┘${RESET}`);
}

function boxHr() {
  const w = inner - 6;
  console.log(`${DIM}   │${RESET}   ${'─'.repeat(w)}   ${DIM}│${RESET}`);
}

console.log('');
boxTop();
boxEmpty();
boxLine(`${RED}${BOLD}       ██████╗ ██████╗██████╗ ${RESET}`);
boxLine(`${RED}${BOLD}      ██╔════╝██╔════╝██╔══██╗${RESET}`);
boxLine(`${RED}${BOLD}      ██║     ██║     ██║  ██║${RESET}`);
boxLine(`${RED}${BOLD}      ██║     ██║     ██║  ██║${RESET}`);
boxLine(`${RED}${BOLD}      ╚██████╗╚██████╗██████╔╝${RESET}`);
boxLine(`${RED}${BOLD}       ╚═════╝ ╚═════╝╚═════╝ ${RESET}`);
boxEmpty();
boxLine(`${RED}${BOLD}      ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗${RESET}`);
boxLine(`${RED}${BOLD}      ██╔══██╗██╔════╝██╔════╝██║██╔═══██╗████╗  ██║${RESET}`);
boxLine(`${RED}${BOLD}      ██║  ██║█████╗  ███████╗██║██║   ██║██╔██╗ ██║${RESET}`);
boxLine(`${RED}${BOLD}      ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║${RESET}`);
boxLine(`${RED}${BOLD}      ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║${RESET}`);
boxLine(`${RED}${BOLD}      ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝${RESET}`);
boxEmpty();
boxLine(`${WHITE}${BOLD}        Agent-Native AI Design Engine${RESET}`);
boxEmpty();
boxHr();
boxEmpty();
boxLine(`${CYAN}        🎨  26 Design Skills    ⚡  12 Instant Templates${RESET}`);
boxLine(`${CYAN}        🤖  20 Model Providers  📤  6 Export Formats${RESET}`);
boxEmpty();
boxHr();
boxEmpty();
boxLine(`${GREEN}        ✅ GentCoDesign installed successfully!${RESET}`);
boxEmpty();
boxHr();
boxEmpty();
boxLine(`${WHITE}        Quick Start:${RESET}`);
boxEmpty();
boxLine(`${DIM}        \$${RESET} ${BOLD}gentcodesign config --set-key openai=sk-xxx${RESET}`);
boxLine(`${DIM}        \$${RESET} ${BOLD}gentcodesign generate "landing page"${RESET}`);
boxEmpty();
boxLine(`${DIM}        Instant templates (no API key needed):${RESET}`);
boxEmpty();
boxLine(`${DIM}        \$${RESET} ${BOLD}gentcodesign template landing${RESET}`);
boxLine(`${DIM}        \$${RESET} ${BOLD}gentcodesign template dashboard${RESET}`);
boxEmpty();
boxHr();
boxEmpty();
boxLine(`${RED}        ⭐  GitHub: ${WHITE}https://github.com/Atum246/gentcodesign${RESET}`);
boxLine(`${RED}        📦  npm:    ${WHITE}npmjs.com/package/gentcodesign${RESET}`);
boxEmpty();
boxBot();
console.log('');
