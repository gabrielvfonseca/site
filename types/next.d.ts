// Next.js specific types
import type { AppProps } from 'next/app';
import type { Metadata, Viewport } from 'next';

// Next.js App Router types
export interface NextAppProps extends AppProps {
  params?: Record<string, string | string[]>;
  searchParams?: Record<string, string | string[]>;
}

// Next.js Page types
export interface NextPageProps<P = {}> {
  params?: P;
  searchParams?: Record<string, string | string[]>;
}

// Next.js Metadata types
export interface NextPageMetadata extends Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
  authors?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: string;
  };
  icons?: {
    icon?: string | { url: string; sizes: string };
    apple?: string | { url: string; sizes: string };
  };
  manifest?: string;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
}

// Next.js Viewport types
export interface NextPageViewport extends Viewport {
  width?: string;
  height?: string;
  initialScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
}

// Next.js Route types
export interface NextRoute {
  pathname: string;
  query: Record<string, string | string[]>;
  asPath: string;
  isReady: boolean;
  isFallback: boolean;
  isPreview: boolean;
}

// Next.js Navigation types
export interface NextNavigation {
  push: (href: string, options?: { scroll?: boolean }) => Promise<boolean>;
  replace: (href: string, options?: { scroll?: boolean }) => Promise<boolean>;
  back: () => Promise<void>;
  forward: () => Promise<void>;
  refresh: () => void;
  prefetch: (href: string, options?: { priority?: boolean }) => void;
}

// Next.js Image types
export interface NextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  unoptimized?: boolean;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Next.js Script types
export interface NextScriptProps {
  src?: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker';
  onLoad?: () => void;
  onError?: (error: Error) => void;
  id?: string;
  defer?: boolean;
  async?: boolean;
  dangerouslySetInnerHTML?: string;
}

// Next.js Font types
export interface NextFontProps {
  src: string;
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  weight?: string;
  style?: 'normal' | 'italic';
  subset?: string;
  variable?: string;
  preload?: boolean;
  fallback?: string[];
  adjustFontFallback?: boolean;
}

// Next.js Dynamic types
export interface NextDynamicOptions {
  loading?: 'lazy' | 'eager';
  ssr?: boolean;
}

// Next.js Head types
export interface NextHeadProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  viewport?: string;
  robots?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
    url?: string;
    type?: string;
    siteName?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    images?: string[];
  };
}

// Next.js Link types
export interface NextLinkProps {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  legacyBehavior?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Next.js Form types
export interface NextFormProps {
  action?: string | ((formData: FormData) => void | Promise<void>);
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  encType?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  noValidate?: boolean;
  autoComplete?: string;
}

// Next.js Server Action types
export interface NextServerAction<T = any> {
  (args?: T): Promise<T>;
  bind: (formData: FormData) => Promise<T>;
}

// Next.js API Route types
export interface NextAPIRoute {
  GET?: (request: Request) => Promise<Response>;
  POST?: (request: Request) => Promise<Response>;
  PUT?: (request: Request) => Promise<Response>;
  DELETE?: (request: Request) => Promise<Response>;
  PATCH?: (request: Request) => Promise<Response>;
}

// Next.js ISR types
export interface NextISROptions {
  revalidate?: number | false;
  tags?: string[];
}

// Next.js Static Generation types
export interface NextStaticProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}

export interface NextStaticPaths {
  paths: string[];
  fallback?: boolean | 'blocking';
}
