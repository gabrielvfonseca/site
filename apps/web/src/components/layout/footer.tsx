'use client';

import { capitalize } from '@gabfon/design-system/lib/utils';
import Link from 'next/link';
import type { JSX } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { CONFIG } from '@/constants/config';
import { cn } from '@/lib/utils';

type FooterLinkProps = {
  href: string;
  label: string;
};

const FooterLink = ({ href, label }: FooterLinkProps) => {
  const isInternal = href.startsWith('/');
  const linkProps = isInternal
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Link
      className={cn(
        'cursor-pointer rounded text-muted-foreground transition-colors duration-300 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
      )}
      href={href}
      {...linkProps}
    >
      {label}
    </Link>
  );
};

export function Footer(): JSX.Element {
  const socialLinks = Object.entries(CONFIG.social).map(([key, value]) => ({
    href: value,
    label: capitalize(key),
  }));

  const links: FooterLinkProps[] = [
    ...socialLinks,
    { href: '/bio', label: 'Bio' },
    { href: '/now', label: 'Now' },
    { href: '/ama', label: 'AMA' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="mt-14 flex w-full flex-col-reverse items-start justify-between gap-y-4 tracking-tight sm:mt-24 sm:flex-row sm:items-center">
      <ThemeToggle />
      <nav
        aria-label="Footer navigation"
        className="flex flex-row gap-x-2 text-xs leading-none tracking-normal"
      >
        {links.map(({ href, label }) => (
          <FooterLink href={href} key={label} label={label} />
        ))}
      </nav>
    </footer>
  );
}
