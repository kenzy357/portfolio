// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// The page itself is static. Only the Keystatic admin (/keystatic) and its API run on the server.
export default defineConfig({
  integrations: [react(), keystatic()],
  adapter: vercel(),
});
