import { defineConfig } from 'astro/config';

// A fully static site: every page is generated from the files in /content and /src/data, then served by nginx.
export default defineConfig({
  output: 'static',
  site: 'https://takweyat.org',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
