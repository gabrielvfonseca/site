// tailwind config is required for editor support

// Types
import type { Config } from 'tailwindcss';

// Shared Tailwind Config
import sharedConfig from '@site/tailwind-config';

// Type
type Extend = 'content' | 'presets';

// Tailwind Config for the App
const config: Pick<Config, Extend> = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  presets: [sharedConfig],
};

// Export the config
export default config;
