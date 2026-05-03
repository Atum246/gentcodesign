#!/usr/bin/env node

/**
 * GentCoDesign - Post-install branding
 * Shows a clean red logo after npm install
 */

const RED = '\x1b[31m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const WHITE = '\x1b[37m';
const CYAN = '\x1b[36m';

const logo = `
${RED}${BOLD}
     ██████╗ ██████╗██████╗ 
    ██╔════╝██╔════╝██╔══██╗
    ██║     ██║     ██║  ██║
    ██║     ██║     ██║  ██║
    ╚██████╗╚██████╗██████╔╝
     ╚═════╝ ╚═════╝╚═════╝ 
${RESET}${RED}${BOLD}
    ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗
    ██╔══██╗██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
    ██║  ██║█████╗  ███████╗██║██║   ██║██╔██╗ ██║
    ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║
    ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║
    ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝${RESET}

${WHITE}${BOLD}    Agent-Native AI Design Engine${RESET}

${DIM}    ─────────────────────────────────────────${RESET}

${CYAN}    🎨  26 Design Skills${RESET}
${CYAN}    ⚡  12 Instant Templates${RESET}
${CYAN}    🤖  20 Model Providers${RESET}
${CYAN}    📤  6 Export Formats${RESET}

${DIM}    ─────────────────────────────────────────${RESET}

${WHITE}    Quick Start:${RESET}

${DIM}    $${RESET} ${BOLD}gentcodesign config --set-key openai=sk-xxx${RESET}
${DIM}    $${RESET} ${BOLD}gentcodesign generate "landing page"${RESET}

${DIM}    Or use instant templates (no API key needed):${RESET}

${DIM}    $${RESET} ${BOLD}gentcodesign template landing${RESET}
${DIM}    $${RESET} ${BOLD}gentcodesign template dashboard${RESET}

${DIM}    ─────────────────────────────────────────${RESET}

${RED}    ⭐  GitHub: ${WHITE}https://github.com/Atum246/gentcodesign${RESET}
${RED}    📦  npm:    ${WHITE}npmjs.com/package/gentcodesign${RESET}

${DIM}    ─────────────────────────────────────────${RESET}
`;

console.log(logo);
