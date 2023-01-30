// ./pages/_document.tsx

import { Head, Html, Main, NextScript } from "next/document"

/* Styles */
import classNames from "classnames";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={classNames(
        "mx-auto px-8 md:w-3/4 lg:w-2/5", 
        "bg-background-light dark:bg-background-dark"
      )}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}