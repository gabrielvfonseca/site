// React specific types
import { ReactNode, ComponentType } from 'react';

// Basic React types
export interface ReactComponentProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  key?: string | number;
  ref?: React.Ref<any>;
}

// Event handler types
export interface ReactEventHandlers {
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (event: React.ChangeEvent) => void;
  onSubmit?: (event: React.FormEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onScroll?: (event: React.UIEvent) => void;
}

// Form types
export interface ReactFormProps extends ReactComponentProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  action?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  noValidate?: boolean;
}

// Input types
export interface ReactInputProps extends ReactComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

// Button types
export interface ReactButtonProps extends ReactComponentProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  form?: string;
}

// Link types
export interface ReactLinkProps extends ReactComponentProps {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  download?: string;
}

// Image types
export interface ReactImageProps extends ReactComponentProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  srcSet?: string;
  sizes?: string;
}

// Component type utilities
export type ReactFC<P = {}> = ComponentType<P>;

// Hook return types
export interface UseStateReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
}

export interface UseEffectReturn {
  cleanup?: () => void;
}

export interface UseRefReturn<T> {
  current: T | null;
}

// Context types
export interface ReactContext<T> {
  Provider: React.FC<{ value: T; children: ReactNode }>;
  Consumer: React.FC<{ children: (value: T) => ReactNode }>;
}

// Router types (for Next.js)
export interface RouterPush {
  (url: string, as?: string): Promise<boolean>;
}

export interface RouterReplace {
  (url: string, as?: string): Promise<boolean>;
}

// Theme types
export interface Theme {
  mode: 'light' | 'dark' | 'system';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    destructive: string;
    border: string;
    input: string;
    ring: string;
  };
}

// Animation types
export interface Animation {
  duration: number;
  easing: string;
  delay?: number;
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none';
  iterationCount?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate';
}

// Layout types
export interface LayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// Modal types
export interface ModalProps extends ReactComponentProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscapeKey?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Table types
export interface TableProps extends ReactComponentProps {
  data: any[];
  columns: {
    key: string;
    title: string;
    render?: (value: any, row: any) => ReactNode;
    sortable?: boolean;
    width?: string | number;
  }[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  loading?: boolean;
  empty?: ReactNode;
}
