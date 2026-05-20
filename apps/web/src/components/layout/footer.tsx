'use client';

import { capitalize } from '@gabfon/design-system/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
        'cursor-pointer rounded text-muted-foreground transition-colors duration-300 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      )}
      href={href}
      {...linkProps}
    >
      {label}
    </Link>
  );
};

const DEFAULT_YEAR = 2024;

export function Footer(): JSX.Element {
  const [_currentYear, setCurrentYear] = useState(DEFAULT_YEAR); // Default year for SSR
  const socialLinks = Object.entries(CONFIG.social).map(([key, value]) => ({
    href: value,
    label: capitalize(key),
  }));

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const links: FooterLinkProps[] = [
    ...socialLinks,
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="mt-14 flex w-full items-center justify-end tracking-tight sm:mt-24">
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
