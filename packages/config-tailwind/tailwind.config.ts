// Types
import type { Config } from 'tailwindcss';

// Plugins
import tailwindAnimate from 'tailwindcss-animate';
import tailwindTypography from '@tailwindcss/typography';
import { fontFamily } from 'tailwindcss/defaultTheme';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    darkMode: ['class'],
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        editorial: ['var(--font-editorial-new)', ...fontFamily.serif],
      },
      colors: {
        gray: {
          50: '#FCFCFC',
          100: '#FAFAFA',
          200: '#F4F4F5',
          300: '#E4E4E7',
          400: '#D4D4D8',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#171717',
          1000: '#101010',
          1100: '#09090B',
          1200: '#040405',
        },
      },
    },
  },
  plugins: [
    tailwindAnimate, 
    tailwindTypography, 
  ],
};

// Export the config object
export default config;
