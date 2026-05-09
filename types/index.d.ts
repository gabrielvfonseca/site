// Global type definitions for the project
/// <reference path="./global.d.ts" />
/// <reference path="./node.d.ts" />
/// <reference path="./react.d.ts" />
/// <reference path="./next.d.ts" />
/// <reference path="./bun.d.ts" />

// Re-export all types for convenience
export * from './global';
export * from './node';
export * from './react';
export * from './next';
export * from './bun';

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Common utility types
export interface PaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SearchOptions {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  pagination?: PaginationOptions;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

export interface ErrorDetails {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Theme and UI types
export interface ColorScheme {
  light: string;
  dark: string;
}

export interface ThemeConfig {
  colors: ColorScheme;
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Configuration types
export interface Config {
  app: {
    name: string;
    description: string;
    url: string;
    version: string;
  };
  database: {
    url: string;
    ssl?: boolean;
    pool?: {
      min: number;
      max: number;
    };
  };
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  auth: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
  analytics: {
    enabled: boolean;
    provider: 'google' | 'posthog' | 'custom';
    key?: string;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
  };
}

// Event types
export interface BaseEvent {
  id: string;
  timestamp: string;
  type: string;
  data?: any;
}

export interface UserEvent extends BaseEvent {
  userId: string;
  sessionId?: string;
}

export interface SystemEvent extends BaseEvent {
  component: string;
  level: 'info' | 'warn' | 'error' | 'debug';
}

// File and media types
export interface FileUpload {
  file: File;
  name: string;
  size: number;
  type: string;
  lastModified: Date;
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  alt?: string;
}

// Network types
export interface NetworkRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

export interface NetworkResponse<T = any> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data?: T;
  error?: string;
  timestamp: string;
}

// Validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationError {
  field: string;
  rule: string;
  message: string;
  value: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Cache types
export interface CacheOptions {
  ttl?: number;
  maxSize?: number;
  strategy?: 'lru' | 'fifo' | 'custom';
}

export interface CacheEntry<T = any> {
  key: string;
  value: T;
  timestamp: number;
  ttl?: number;
}

// Performance monitoring types
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  tags?: Record<string, string>;
}

export interface PerformanceReport {
  metrics: PerformanceMetric[];
  summary: {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    throughput: number;
  };
  timestamp: string;
}
