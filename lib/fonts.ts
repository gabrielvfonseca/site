// ./lib/fonts.ts

import { 
  Inter as FontSans, 
  Unbounded as FontSerif 
} from "@next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
});

