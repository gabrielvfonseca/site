// This module is used to define the fonts that will be used in the project.

// Import the fonts
import { Inter } from "next/font/google";
import localFont from 'next/font/local';

// Inter font
const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
  });

// Editorial New font
const editorialNew = localFont({
  variable: '--font-editorial-new',
  src: [
    {
      path: './EditorialNew-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './EditorialNew-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './EditorialNew-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './EditorialNew-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './EditorialNew-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './EditorialNew-Ultrabold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './EditorialNew-Heavy.woff2',
      weight: '900',
      style: 'normal',
    }
  ]
});

// Export the fonts
export { editorialNew, inter };