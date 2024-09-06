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
        primary: '#3b82f6',
        secondary: '#004dcb',

        black: '#000000',
        white: '#FFFFFF',

        coal: '#0D0D0D',
        charcoal: '#404550',
        silver: '#B5B7BE',  
        salt: '#EFF1F5',

        gray: {
          50: '#FCFCFC',
          100: '#FAFAFA',
          200: '#F8F9FA',
          300: '#E9ECEF',
          400: '#DEE2E6',
          500: '#CED4DA',
          600: '#ADB5BD',
          700: '#6C757D',
          800: '#495057',
          900: '#343A40',
          1000: '#212529',
          1100: '#17191C',
          1200: '#111214',
          1300: '#050505',
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
