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
    container: {
      center: true,
    },
    colors: {
      'transparent': 'transparent',

      // Background colors
      'background-100': 'var(--ui-background-100)',
      'background-200': 'var(--ui-background-200)',

      // Primary
      primary: 'var(--primary-color)',
      selection: 'var(--selection-color)',
      
      // Accents
      'accents-1': 'var(--accents-1)',
      'accents-2': 'var(--accents-2)',
      'accents-3': 'var(--accents-3)',
      'accents-4': 'var(--accents-4)',
      'accents-5': 'var(--accents-5)',
      'accents-6': 'var(--accents-6)',
      'accents-7': 'var(--accents-7)',
      'accents-8': 'var(--accents-8)',

      // UI Colors
      'gray-100': 'var(--ui-gray-100)',
      'gray-200': 'var(--ui-gray-200)',
      'gray-300': 'var(--ui-gray-300)',
      'gray-400': 'var(--ui-gray-400)',
      'gray-500': 'var(--ui-gray-500)',
      'gray-600': 'var(--ui-gray-600)',
      'gray-700': 'var(--ui-gray-700)',
      'gray-800': 'var(--ui-gray-800)',
      'gray-900': 'var(--ui-gray-900)',
      'gray-1000': 'var(--ui-gray-1000)',

      'gray-alpha-100': 'var(--ui-gray-alpha-100)',
      'gray-alpha-200': 'var(--ui-gray-alpha-200)',
      'gray-alpha-300': 'var(--ui-gray-alpha-300)',
      'gray-alpha-400': 'var(--ui-gray-alpha-400)',
      'gray-alpha-500': 'var(--ui-gray-alpha-500)',
      'gray-alpha-600': 'var(--ui-gray-alpha-600)',
      'gray-alpha-700': 'var(--ui-gray-alpha-700)',
      'gray-alpha-800': 'var(--ui-gray-alpha-800)',
      'gray-alpha-900': 'var(--ui-gray-alpha-900)',
      'gray-alpha-1000': 'var(--ui-gray-alpha-1000)',

      'blue-100': 'var(--ui-blue-100)',
      'blue-200': 'var(--ui-blue-200)',
      'blue-300': 'var(--ui-blue-300)',
      'blue-400': 'var(--ui-blue-400)',
      'blue-500': 'var(--ui-blue-500)',
      'blue-600': 'var(--ui-blue-600)',
      'blue-700': 'var(--ui-blue-700)',
      'blue-800': 'var(--ui-blue-800)',
      'blue-900': 'var(--ui-blue-900)',
      'blue-1000': 'var(--ui-blue-1000)',

      'red-100': 'var(--ui-red-100)',
      'red-200': 'var(--ui-red-200)',
      'red-300': 'var(--ui-red-300)',
      'red-400': 'var(--ui-red-400)',
      'red-500': 'var(--ui-red-500)',
      'red-600': 'var(--ui-red-600)',
      'red-700': 'var(--ui-red-700)',
      'red-800': 'var(--ui-red-800)',
      'red-900': 'var(--ui-red-900)',
      'red-1000': 'var(--ui-red-1000)',

      'green-100': 'var(--ui-green-100)',
      'green-200': 'var(--ui-green-200)',
      'green-300': 'var(--ui-green-300)',
      'green-400': 'var(--ui-green-400)',
      'green-500': 'var(--ui-green-500)',
      'green-600': 'var(--ui-green-600)',
      'green-700': 'var(--ui-green-700)',
      'green-800': 'var(--ui-green-800)',
      'green-900': 'var(--ui-green-900)',
      'green-1000': 'var(--ui-green-1000)',

      'teal-100': 'var(--ui-teal-100)',
      'teal-200': 'var(--ui-teal-200)',
      'teal-300': 'var(--ui-teal-300)',
      'teal-400': 'var(--ui-teal-400)',
      'teal-500': 'var(--ui-teal-500)',
      'teal-600': 'var(--ui-teal-600)',
      'teal-700': 'var(--ui-teal-700)',
      'teal-800': 'var(--ui-teal-800)',
      'teal-900': 'var(--ui-teal-900)',
      'teal-1000': 'var(--ui-teal-1000)',

      'purple-100': 'var(--ui-purple-100)',
      'purple-200': 'var(--ui-purple-200)',
      'purple-300': 'var(--ui-purple-300)',
      'purple-400': 'var(--ui-purple-400)',
      'purple-500': 'var(--ui-purple-500)',
      'purple-600': 'var(--ui-purple-600)',
      'purple-700': 'var(--ui-purple-700)',
      'purple-800': 'var(--ui-purple-800)',
      'purple-900': 'var(--ui-purple-900)',
      'purple-1000': 'var(--ui-purple-1000)',

      'pink-100': 'var(--ui-pink-100)',
      'pink-200': 'var(--ui-pink-200)',
      'pink-300': 'var(--ui-pink-300)',
      'pink-400': 'var(--ui-pink-400)',
      'pink-500': 'var(--ui-pink-500)',
      'pink-600': 'var(--ui-pink-600)',
      'pink-700': 'var(--ui-pink-700)',
      'pink-800': 'var(--ui-pink-800)',
      'pink-900': 'var(--ui-pink-900)',
      'pink-1000': 'var(--ui-pink-1000)',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
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
