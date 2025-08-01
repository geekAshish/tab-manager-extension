import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  "description": "Manage tabs with multiple Google accounts",
  "permissions": ["tabs", "identity"],
  "oauth2": {
    "client_id": "GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    "scopes": ["profile", "email"]
  },
  "background": {
    "service_worker": "src/background/index.ts",
    type: "module"
  },
  "action": {
    "default_popup": "src/popup/index.html",
    "default_icon": {
      48: 'public/logo.png',
    }
  },
  icons: {
    48: 'public/logo.png',
  },
  content_scripts: [{
    js: ['src/content/main.tsx'],
    matches: ['https://*/*'],
  }],
})
