# SuperChat Chrome Extension

> **Prototype** - This is a demo/prototype extension for showcasing a multi-channel messaging inbox UI.

Universal inbox Chrome extension for managing customer conversations across multiple messaging channels: WhatsApp, Telegram, Instagram, Facebook & Email.

## Features

- **Multi-channel support**: WhatsApp, Telegram, Instagram, Facebook, Email
- **Unified inbox**: Manage all conversations in one place
- **Tab-based interface**: Assigned, Unassigned, and Settings views
- **Chat popover**: Click on any conversation to view message history
- **Theme support**: Light, Dark, and System themes
- **Web Push notifications**: Ready for push notification integration

## Tech Stack

- React 19
- TypeScript
- Vite
- Chrome Extension Manifest V3

## Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/crottolo/superchat-chrome-extension.git
cd superchat-chrome-extension
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the extension:

```bash
pnpm build
```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `dist` folder from the project

### Development Mode

For hot-reload during development:

```bash
pnpm dev
```

Then load the `dist` folder as an unpacked extension. Reload the extension after code changes.

## Project Structure

```
src/
├── components/       # React components
│   ├── TabView.tsx      # Main tab container
│   ├── ChatList.tsx     # Chat list with popover
│   ├── ChatPopover.tsx  # Chat conversation view
│   ├── MessageList.tsx  # Message bubbles
│   └── ...
├── data/
│   └── mockData.ts   # Demo data for prototype
├── hooks/            # Custom React hooks
├── styles/           # CSS stylesheets
└── background/       # Service worker
```

## License

MIT
