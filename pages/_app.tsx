// ./pages/_app.tsx

import React, { useState, useEffect } from "react";

/* Next */
import type { AppProps } from "next/app";

/* Styles */
import "@/styles/globals.css";

/* Theme */
import { ThemeProvider } from "next-themes";

/* Framer Motion */
import { AnimatePresence } from "framer-motion";

/* Vercel */
import { Analytics } from "@vercel/analytics/react";

/* Fonts */
import { fontSans, fontSerif } from "@/lib/fonts";

/* Components */
import Header from "@/components/header";
import Footer from "@/components/footer";
import Playing from "@/components/player";
import GoToTopButton from "@/components/goTop";

export default function App({ Component, pageProps }: AppProps) {
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setshowGoTop] = useState(false);

  useEffect(() => {
    const handleGoToTop = () => {
      const position = window.pageYOffset;
      setSrollPosition(position);
    
      if (scrollPosition > 450) {
        return setshowGoTop(true);
      } else if (scrollPosition < 450) {
        return setshowGoTop(false);
      }
    };

    window.addEventListener('scroll', handleGoToTop);

    window.history.scrollRestoration = 'manual'
  }, [scrollPosition]);

  return (
    <>
      <style jsx global>{`
          :root {
          --font-sans: ${fontSans.style.fontFamily};
          --font-serif: ${fontSerif.style.fontFamily};
          }
      }`}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <AnimatePresence>{showGoTop && <GoToTopButton />}</AnimatePresence>
        <Component {...pageProps} />
        <Playing />
        <Footer />
      </ThemeProvider>
      <Analytics />
    </>
  )
}
