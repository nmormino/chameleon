import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
// Import /serverless for a Serverless SSR site
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  adapter: vercel(),
});