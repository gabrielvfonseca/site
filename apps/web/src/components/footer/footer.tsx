import React from 'react';
import { ThemeSwitcher } from '@repo/design-system/components/theme-switcher/theme-switcher';

export function Footer() {
  return (
    <footer className='mt-14 sm:mt-24 flex justify-between items-center tracking-tight w-full'>
      <span className='text-xs tracking-normal leading-none font-medium text-quaternary-foreground/50'>
        &copy; {new Date().getFullYear()}. All rights reserved.
      </span>
      <ThemeSwitcher />
    </footer>
  );
}