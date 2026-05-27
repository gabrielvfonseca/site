import { capitalize } from '@gabfon/design-system/lib/utils';
import Link from 'next/link';
import { CONFIG } from '@/constants/config';
import { getCurrentYear } from '@/utils/date';

type FooterLinkProps = {
  href: string;
  label: string;
};

const FooterLink = ({ href, label }: FooterLinkProps) => {
  const isInternal = href.startsWith('/');
  const isExternal = !isInternal;
  const linkProps = isExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      className="cursor-pointer text-muted-foreground transition-colors duration-300 hover:text-foreground"
      href={href}
      {...linkProps}
      aria-label={isExternal ? `Visit ${label} (opens in new tab)` : label}
    >
      {label}
      {isExternal && <span className="sr-only"> (opens in new tab)</span>}
    </Link>
  );
};

export function Footer() {
  const currentYear = getCurrentYear();
  const socialLinks = Object.entries(CONFIG.social).map(([key, value]) => ({
    href: value,
    label: capitalize(key),
  }));

  const links: FooterLinkProps[] = [
    ...socialLinks,
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="mt-14 flex w-full items-center justify-between tracking-tight sm:mt-24">
      <span className="text-muted-foreground text-xs leading-none tracking-normal">
        &copy; {currentYear}. All rights reserved.
      </span>

      <nav className="flex flex-row gap-x-2 text-xs leading-none tracking-normal">
        {links.map(({ href, label }) => (
          <FooterLink href={href} key={label} label={label} />
        ))}
      </nav>
    </footer>
  );
}
