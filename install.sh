#!/bin/bash
# GentCoDesign - Universal Installer
# Installs Node.js (if needed) + GentCoDesign on macOS, Linux, Windows (WSL/Git Bash)

set -e

RED='\033[0;31m'
BOLD='\033[1m'
DIM='\033[2m'
WHITE='\033[1;37m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RESET='\033[0m'

COLS=$(tput cols 2>/dev/null || echo 80)

center() {
  local text="$1"
  local stripped=$(echo -e "$text" | sed 's/\x1b\[[0-9;]*m//g')
  local len=${#stripped}
  local pad=$(( (COLS - len) / 2 ))
  [ $pad -lt 0 ] && pad=0
  printf "%${pad}s%s\n" "" "$text"
}

box_line() {
  local text="$1"
  local stripped=$(echo -e "$text" | sed 's/\x1b\[[0-9;]*m//g')
  local len=${#stripped}
  local inner=$(( COLS - 4 ))
  local pad=$(( inner - len ))
  [ $pad -lt 0 ] && pad=0
  printf "  ${DIM}│${RESET} %s%${pad}s${DIM} │${RESET}\n" "$text" ""
}

box_top() {
  local w=$(( COLS - 4 ))
  printf "  ${DIM}┌"
  printf '─%.0s' $(seq 1 $w)
  printf "┐${RESET}\n"
}

box_bot() {
  local w=$(( COLS - 4 ))
  printf "  ${DIM}└"
  printf '─%.0s' $(seq 1 $w)
  printf "┘${RESET}\n"
}

box_empty() {
  local w=$(( COLS - 4 ))
  printf "  ${DIM}│${RESET}%${w}s${DIM}│${RESET}\n" ""
}

box_hr() {
  local w=$(( COLS - 8 ))
  printf "  ${DIM}│${RESET}   "
  printf '─%.0s' $(seq 1 $w)
  printf "   ${DIM}│${RESET}\n"
}

clear

echo ""
box_top
box_empty
box_line "${RED}${BOLD}       ██████╗ ██████╗██████╗ ${RESET}"
box_line "${RED}${BOLD}      ██╔════╝██╔════╝██╔══██╗${RESET}"
box_line "${RED}${BOLD}      ██║     ██║     ██║  ██║${RESET}"
box_line "${RED}${BOLD}      ██║     ██║     ██║  ██║${RESET}"
box_line "${RED}${BOLD}      ╚██████╗╚██████╗██████╔╝${RESET}"
box_line "${RED}${BOLD}       ╚═════╝ ╚═════╝╚═════╝ ${RESET}"
box_empty
box_line "${RED}${BOLD}      ██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗${RESET}"
box_line "${RED}${BOLD}      ██╔══██╗██╔════╝██╔════╝██║██╔═══██╗████╗  ██║${RESET}"
box_line "${RED}${BOLD}      ██║  ██║█████╗  ███████╗██║██║   ██║██╔██╗ ██║${RESET}"
box_line "${RED}${BOLD}      ██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║${RESET}"
box_line "${RED}${BOLD}      ██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║${RESET}"
box_line "${RED}${BOLD}      ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝${RESET}"
box_empty
box_line "${WHITE}${BOLD}        Agent-Native AI Design Engine${RESET}"
box_empty
box_hr
box_empty
box_line "${CYAN}        🎨  26 Design Skills    ⚡  12 Instant Templates${RESET}"
box_line "${CYAN}        🤖  20 Model Providers  📤  6 Export Formats${RESET}"
box_empty
box_hr
box_empty

# Check Node.js
NODE_OK=false
if command -v node &>/dev/null; then
  NODE_VER=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_VER" -ge 18 ] 2>/dev/null; then
    NODE_OK=true
    box_line "${GREEN}        ✅ Node.js $(node -v) detected${RESET}"
  fi
fi

if [ "$NODE_OK" = false ]; then
  box_line "${WHITE}        📦 Installing Node.js...${RESET}"
  box_empty

  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if command -v brew &>/dev/null; then
      box_line "${DIM}        → brew install node${RESET}"
      brew install node 2>&1 | tail -1 | xargs -I{} box_line "${DIM}        {}${RESET}"
    else
      box_line "${DIM}        → Installing Homebrew first...${RESET}"
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 2>/dev/null
      brew install node 2>&1 | tail -1 | xargs -I{} box_line "${DIM}        {}${RESET}"
    fi
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v apt-get &>/dev/null; then
      box_line "${DIM}        → apt install nodejs npm${RESET}"
      curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - 2>/dev/null
      sudo apt-get install -y nodejs 2>/dev/null | tail -1 | xargs -I{} box_line "${DIM}        {}${RESET}"
    elif command -v dnf &>/dev/null; then
      box_line "${DIM}        → dnf install nodejs npm${RESET}"
      sudo dnf install -y nodejs npm 2>/dev/null | tail -1 | xargs -I{} box_line "${DIM}        {}${RESET}"
    elif command -v yum &>/dev/null; then
      box_line "${DIM}        → yum install nodejs npm${RESET}"
      curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash - 2>/dev/null
      sudo yum install -y nodejs 2>/dev/null | tail -1 | xargs -I{} box_line "${DIM}        {}${RESET}"
    elif command -v pacman &>/dev/null; then
      box_line "${DIM}        → pacman -S nodejs npm${RESET}"
      sudo pacman -S --noconfirm nodejs npm 2>/dev/null | tail -1 | xargs -I{} box_line "${DIM}        {}${RESET}"
    fi
  elif [[ "$OSTYPE" == "msys"* ]] || [[ "$OSTYPE" == "cygwin"* ]]; then
    # Windows (Git Bash / MSYS)
    box_line "${DIM}        → winget install OpenJS.NodeJS.LTS${RESET}"
    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements 2>/dev/null
  fi

  if command -v node &>/dev/null; then
    box_empty
    box_line "${GREEN}        ✅ Node.js $(node -v) installed${RESET}"
  else
    box_empty
    box_line "${RED}        ❌ Node.js install failed${RESET}"
    box_line "${WHITE}        Please install manually: https://nodejs.org${RESET}"
    box_empty
    box_bot
    exit 1
  fi
fi

box_empty
box_line "${WHITE}        📦 Installing GentCoDesign...${RESET}"
box_empty

npm install -g gentcodesign 2>/dev/null | tail -3 | while read -r line; do
  box_line "${DIM}        $line${RESET}"
done

box_empty

if command -v gentcodesign &>/dev/null; then
  box_line "${GREEN}        ✅ GentCoDesign v$(gentcodesign --version) installed!${RESET}"
else
  box_line "${GREEN}        ✅ GentCoDesign installed!${RESET}"
fi

box_empty
box_hr
box_empty
box_line "${WHITE}        Quick Start:${RESET}"
box_empty
box_line "${DIM}        \$${RESET} ${BOLD}gentcodesign config --set-key openai=sk-xxx${RESET}"
box_line "${DIM}        \$${RESET} ${BOLD}gentcodesign generate \"landing page\"${RESET}"
box_empty
box_line "${DIM}        Or use instant templates (no API key needed):${RESET}"
box_empty
box_line "${DIM}        \$${RESET} ${BOLD}gentcodesign template landing${RESET}"
box_line "${DIM}        \$${RESET} ${BOLD}gentcodesign template dashboard${RESET}"
box_empty
box_hr
box_empty
box_line "${RED}        ⭐  GitHub: ${WHITE}https://github.com/Atum246/gentcodesign${RESET}"
box_line "${RED}        📦  npm:    ${WHITE}npmjs.com/package/gentcodesign${RESET}"
box_empty
box_bot
echo ""
