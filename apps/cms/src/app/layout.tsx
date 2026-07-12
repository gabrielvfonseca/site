import type { ReactNode } from 'react';
import { SuppressConsoleWarnings } from './suppress-console-warnings';

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode {
  return (
    <html lang="en">
      <body>
        <SuppressConsoleWarnings />
        {children}
      </body>
    </html>
  );
}
