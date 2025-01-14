import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';
import typographyConfig from './typography.config';

export const config: Config = {
  darkMode: ['class'],
  content: [
    './node_modules/@repo/design-system/components/**/*.{ts,tsx}',
    './node_modules/@repo/design-system/lib/**/*.{ts,tsx}',
    './node_modules/@repo/design-system/index.tsx',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
        },
        quaternary: {
          DEFAULT: 'hsl(var(--quaternary))',
          foreground: 'hsl(var(--quaternary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        brand: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        
        'accents-1': 'hsl(var(--accents-1))',
        'accents-2': 'hsl(var(--accents-2))',
        'accents-3': 'hsl(var(--accents-3))',
        'accents-4': 'hsl(var(--accents-4))',
        'accents-5': 'hsl(var(--accents-5))',
        'accents-6': 'hsl(var(--accents-6))',
        'accents-7': 'hsl(var(--accents-7))',
        'accents-8': 'hsl(var(--accents-8))',

        'gray-100': 'hsl(var(--ui-gray-100))',
        'gray-200': 'hsl(var(--ui-gray-200))',
        'gray-300': 'hsl(var(--ui-gray-300))',
        'gray-400': 'hsl(var(--ui-gray-400))',
        'gray-500': 'hsl(var(--ui-gray-500))',
        'gray-600': 'hsl(var(--ui-gray-600))',
        'gray-700': 'hsl(var(--ui-gray-700))',
        'gray-800': 'hsl(var(--ui-gray-800))',
        'gray-900': 'hsl(var(--ui-gray-900))',
        'gray-1000': 'hsl(var(--ui-gray-1000))',

        'blue-100': 'hsl(var(--ui-blue-100))',
        'blue-200': 'hsl(var(--ui-blue-200))',
        'blue-300': 'hsl(var(--ui-blue-300))',
        'blue-400': 'hsl(var(--ui-blue-400))',
        'blue-500': 'hsl(var(--ui-blue-500))',
        'blue-600': 'hsl(var(--ui-blue-600))',
        'blue-700': 'hsl(var(--ui-blue-700))',
        'blue-800': 'hsl(var(--ui-blue-800))',
        'blue-900': 'hsl(var(--ui-blue-900))',
        'blue-1000': 'hsl(var(--ui-blue-1000))',

        'red-100': 'hsl(var(--ui-red-100))',
        'red-200': 'hsl(var(--ui-red-200))',
        'red-300': 'hsl(var(--ui-red-300))',
        'red-400': 'hsl(var(--ui-red-400))',
        'red-500': 'hsl(var(--ui-red-500))',
        'red-600': 'hsl(var(--ui-red-600))',
        'red-700': 'hsl(var(--ui-red-700))',
        'red-800': 'hsl(var(--ui-red-800))',
        'red-900': 'hsl(var(--ui-red-900))',
        'red-1000': 'hsl(var(--ui-red-1000))',

        'green-100': 'hsl(var(--ui-green-100))',
        'green-200': 'hsl(var(--ui-green-200))',
        'green-300': 'hsl(var(--ui-green-300))',
        'green-400': 'hsl(var(--ui-green-400))',
        'green-500': 'hsl(var(--ui-green-500))',
        'green-600': 'hsl(var(--ui-green-600))',
        'green-700': 'hsl(var(--ui-green-700))',
        'green-800': 'hsl(var(--ui-green-800))',
        'green-900': 'hsl(var(--ui-green-900))',
        'green-1000': 'hsl(var(--ui-green-1000))',

        'teal-100': 'hsl(var(--ui-teal-100))',
        'teal-200': 'hsl(var(--ui-teal-200))',
        'teal-300': 'hsl(var(--ui-teal-300))',
        'teal-400': 'hsl(var(--ui-teal-400))',
        'teal-500': 'hsl(var(--ui-teal-500))',
        'teal-600': 'hsl(var(--ui-teal-600))',
        'teal-700': 'hsl(var(--ui-teal-700))',
        'teal-800': 'hsl(var(--ui-teal-800))',
        'teal-900': 'hsl(var(--ui-teal-900))',
        'teal-1000': 'hsl(var(--ui-teal-1000))',

        'purple-100': 'hsl(var(--ui-purple-100))',
        'purple-200': 'hsl(var(--ui-purple-200))',
        'purple-300': 'hsl(var(--ui-purple-300))',
        'purple-400': 'hsl(var(--ui-purple-400))',
        'purple-500': 'hsl(var(--ui-purple-500))',
        'purple-600': 'hsl(var(--ui-purple-600))',
        'purple-700': 'hsl(var(--ui-purple-700))',
        'purple-800': 'hsl(var(--ui-purple-800))',
        'purple-900': 'hsl(var(--ui-purple-900))',
        'purple-1000': 'hsl(var(--ui-purple-1000))',

        'pink-100': 'hsl(var(--ui-pink-100))',
        'pink-200': 'hsl(var(--ui-pink-200))',
        'pink-300': 'hsl(var(--ui-pink-300))',
        'pink-400': 'hsl(var(--ui-pink-400))',
        'pink-500': 'hsl(var(--ui-pink-500))',
        'pink-600': 'hsl(var(--ui-pink-600))',
        'pink-700': 'hsl(var(--ui-pink-700))',
        'pink-800': 'hsl(var(--ui-pink-800))',
        'pink-900': 'hsl(var(--ui-pink-900))',
        'pink-1000': 'hsl(var(--ui-pink-1000))',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: typographyConfig,
    },
  },
  plugins: [animate, typography],
};
