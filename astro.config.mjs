import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
// Import /serverless for a Serverless SSR site
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: vercel(),
});