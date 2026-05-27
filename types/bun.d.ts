// Bun file system types
export interface BunFile {
  name(): string;
  size(): number;
  lastModified(): Date;
  file(): BunFile | null;
  text(): Promise<string>;
  json(): Promise<any>;
  arrayBuffer(): Promise<ArrayBuffer>;
  stream(): ReadableStream;
  slice(start?: number, end?: number): BunFile;
  exists(): boolean;
}

// Bun server types
export interface BunServer {
  port: number;
  hostname: string;
  development: boolean;
  requestIP: string;
  pendingRequests: number;
  uptime: number;
}

// Bun serve options
export interface BunServeOptions {
  port?: number;
  hostname?: string;
  development?: boolean;
  static?: string;
  ssl?: {
    key: string;
    cert: string;
  };
  websocket?: {
    message?: (data: any) => any;
    open?: (ws: any) => void;
    close?: (ws: any) => void;
    error?: (ws: any, error: Error) => void;
  };
  fetch?: (request: Request) => Response | Promise<Response>;
}

// Bun SQLite types
export interface BunDatabase {
  query<T = any>(sql: string, params?: T[]): Promise<any[]>;
  run<T = any>(sql: string, params?: T[]): Promise<any>;
  prepare(sql: string): any;
  exec<T = any>(sql: string, params?: T[]): Promise<any>;
  close(): void;
}

// Bun crypto types
export interface BunCrypto {
  hash(algorithm: string, data: string | ArrayBuffer): Promise<ArrayBuffer>;
  hmac(
    key: string | ArrayBuffer,
    algorithm: string,
    data: string | ArrayBuffer
  ): Promise<ArrayBuffer>;
  randomBytes(length: number): ArrayBuffer;
  passwordHash(
    password: string,
    salt: string,
    algorithm?: string
  ): Promise<ArrayBuffer>;
  passwordVerify(
    password: string,
    salt: string,
    hash: ArrayBuffer,
    algorithm?: string
  ): Promise<boolean>;
}

// Bun test types
export interface BunTest {
  expect(value: any): any;
  test(name: string, fn: () => void | Promise<void>): void;
  describe(name: string, fn: () => void): void;
  it(name: string, fn: () => void | Promise<void>): void;
  beforeAll(fn: () => void | Promise<void>): void;
  afterAll(fn: () => void | Promise<void>): void;
  beforeEach(fn: () => void | Promise<void>): void;
  afterEach(fn: () => void | Promise<void>): void;
  mock<T>(module: string, exports?: Partial<T>): T;
  spyOn(object: any, method: string): any;
}

// Bun build types
export interface BunBuildConfig {
  entrypoints?: Record<string, string>;
  target?: 'bun' | 'node';
  format?: 'esm' | 'cjs';
  minify?: boolean;
  sourcemap?: boolean;
  external?: string[];
  define?: Record<string, string>;
  plugins?: any[];
}

// Bun runtime types
export interface BunRuntime {
  version: string;
  revision: string;
  arch: string;
  platform: string;
  pid: number;
  ppid: number;
  cwd: string;
  execArgv: string[];
  env: Record<string, string>;
  hrtime: { sec: number; nsec: number };
  memoryUsage(): {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
    arrayBuffers: number;
  };
}

// Bun specific utilities
export interface BunUtilities {
  file(path: string): BunFile;
  write(path: string, data: string | ArrayBuffer): Promise<number>;
  read(path: string): Promise<BunFile>;
  exists(path: string): Promise<boolean>;
  mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  rm(path: string, options?: { recursive?: boolean }): Promise<void>;
  cp(src: string, dest: string): Promise<void>;
  glob(pattern: string): Promise<string[]>;
  serve(options?: BunServeOptions): BunServer;
}

// Bun HTTP types
export interface BunHTTP {
  serve<T = any>(options: {
    fetch?: (request: Request) => Response | Promise<Response>;
    error?: (error: Error) => Response | Promise<Response>;
    websocket?: {
      message?: (data: any) => any;
      open?: (ws: any) => void;
      close?: (ws: any) => void;
      error?: (ws: any, error: Error) => void;
    };
    port?: number;
    hostname?: string;
    development?: boolean;
    static?: string;
    ssl?: {
      key: string;
      cert: string;
    };
  }): T;
}

// Bun specific global extensions
declare global {
  var Bun: typeof Bun;
  var __BUN: boolean;
  var __BUN_VERSION__: string;
}

// Type guards for Bun
export function isBun(): boolean {
  return typeof globalThis.Bun !== 'undefined';
}

export function isBunRuntime(): boolean {
  return typeof globalThis.__BUN !== 'undefined';
}
