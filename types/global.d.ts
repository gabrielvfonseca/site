// Global type definitions for the project

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  preferences?: {
    theme?: string;
    language?: string;
    notifications?: boolean;
  };
  metadata?: {
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author?: {
    name: string;
    email: string;
    avatar?: string;
  };
  tags?: string[];
  metadata?: {
    readingTime?: string;
    featured?: boolean;
    category?: string;
  };
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  status: number;
  message?: string;
}

export interface MockResponse<T> extends ApiResponse<T> {
  ok: true;
  data: T;
  status: 200;
}

// Next.js specific types
export interface NextRouter {
  push: (url: string) => Promise<void>;
  replace: (url: string) => Promise<void>;
  back: () => Promise<void>;
  prefetch: (url: string) => Promise<void>;
  refresh: () => Promise<void>;
  pathname: string;
  query: Record<string, any>;
  asPath: string;
  route: string;
  params: Record<string, any>;
  isReady: boolean;
}

export interface NextNavigation {
  prefetch: (url: string) => Promise<void>;
  replace: (url: string) => Promise<void>;
  back: () => Promise<void>;
  forward: () => Promise<void>;
  refresh: () => Promise<void>;
}

// Environment variable types
export interface EnvVars {
  NODE_ENV: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_URL: string;
  DATABASE_URL: string;
  NEXTAUTH_SECRET: string;
  SENTRY_DSN?: string;
  POSTHOG_KEY?: string;
  ANALYZE?: string;
}

// Analytics types
export interface Analytics {
  track: (eventName: string, properties?: Record<string, any>) => void;
  pageview: (path: string) => void;
  identify: (userId: string, traits?: Record<string, any>) => void;
  reset: () => void;
}

// Observability types
export interface Observability {
  log: (message: string, context?: Record<string, any>) => void;
  error: (message: string, context?: Record<string, any>) => void;
  warn: (message: string, context?: Record<string, any>) => void;
  info: (message: string, context?: Record<string, any>) => void;
  debug: (message: string, context?: Record<string, any>) => void;
  captureException: (
    error: Error | string,
    context?: Record<string, any>
  ) => void;
  setUser: (user: Partial<User>) => void;
}

// Performance types
export interface PerformanceResult {
  duration: number;
  start: number;
  end: number;
}

// Test utilities types
export interface TestServer {
  addUser: (id: string, user: any) => void;
  getUser: (id: string) => any;
  addPost: (id: string, post: any) => void;
  getPost: (id: string) => any;
  getAllPosts: () => any[];
  cleanup: () => void;
}

// React component props
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  'data-loading'?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export interface InputProps {
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

// MDX content types
export interface MDXFrontmatter {
  title: string;
  description?: string;
  published?: boolean;
  date?: string;
  author?: string;
  tags?: string[];
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
