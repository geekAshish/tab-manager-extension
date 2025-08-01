# React + Vite + CRXJS

This template helps you quickly start developing Chrome extensions with React, TypeScript and Vite. It includes the CRXJS Vite plugin for seamless Chrome extension development.

## Features

- React with TypeScript
- TypeScript support
- Vite build tool
- CRXJS Vite plugin integration
- Chrome extension manifest configuration

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open Chrome and navigate to `chrome://extensions/`, enable "Developer mode", and load the unpacked extension from the `dist` directory.

4. Build for production:

```bash
npm run build
```

## Project Structure

- `src/popup/` - Extension popup UI
- `src/content/` - Content scripts
- `manifest.config.ts` - Chrome extension manifest configuration

## Documentation

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [CRXJS Documentation](https://crxjs.dev/vite-plugin)

## Chrome Extension Development Notes

- Use `manifest.config.ts` to configure your extension
- The CRXJS plugin automatically handles manifest generation
- Content scripts should be placed in `src/content/`
- Popup UI should be placed in `src/popup/`


## base folder structure
src/
├── assets/              # Static assets like icons, images, etc.
│
├── background/          # Background service worker (runs continuously)
│   └── index.ts         # Background logic (e.g., listening to tab changes, auth)
│
├── components/          # Reusable React components (used in popup or content)
│   └── Popup.tsx        # Example: React component for popup UI
│
├── content/             # Scripts injected into web pages (content scripts)
│   ├── views/
│   │   └── app.tsx      # Content script UI (if injecting React into pages)
│   └── main.tsx         # Entry point for content script
│
├── popup/               # The popup (shows when you click extension icon)
│   ├── app.tsx          # Main UI component for popup
│   ├── main.tsx         # Renders `app.tsx` into the DOM
│   └── index.html       # HTML shell loaded by the popup
