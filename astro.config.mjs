import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import emdash, { local } from 'emdash/astro';
import { sqlite } from 'emdash/db';

// The public pages are still generated at build time from /content and /src/data (static).
// EmDash adds the admin at /_emdash/admin and runs on a Node server; its database and uploads live in ./data (a volume in production).
export default defineConfig({
  output: 'static',
  site: 'https://takweyat.org',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    emdash({
      database: sqlite({ url: `file:${process.env.DATABASE_PATH ?? './data/emdash.db'}` }),
      storage: local({ directory: './data/uploads', baseUrl: '/_emdash/api/media/file' }),
    }),
  ],
});
