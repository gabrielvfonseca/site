// Node.js specific types
declare global {
  namespace NodeJs {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_API_URL: string;
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      SENTRY_DSN?: string;
      POSTHOG_KEY?: string;
      ANALYZE?: string;
    }
  }
}

// Global performance API
declare global {
  interface Performance {
    now(): number;
    getEntriesByType(type: string): PerformanceEntry[];
  }

  interface PerformanceEntry {
    name: string;
    entryType: string;
    startTime: number;
    duration: number;
  }
}

// Global console API
declare global {
  interface Console {
    log(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
  }
}

// Global fetch API
declare global {
  interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    referrer?: string;
    integrity?: string;
    signal?: AbortSignal | null;
    keepalive?: boolean;
  }

  interface Response {
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly headers: Headers;
    readonly url: string;
    readonly redirected: boolean;
    readonly type: ResponseType;
    json(): Promise<any>;
    text(): Promise<string>;
    blob(): Promise<Blob>;
    arrayBuffer(): Promise<ArrayBuffer>;
    formData(): Promise<FormData>;
  }

  function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response>;
}

// Global storage APIs
declare global {
  interface Storage {
    length: number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
  }

  var localStorage: Storage;
  var sessionStorage: Storage;
}

// Global URL API
declare global {
  interface URLSearchParams {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    getAll(): string[];
    has(name: string): boolean;
    set(name: string, value: string): void;
    sort(): void;
    toString(): string;
  }

  interface URL {
    constructor(url: string | URL, base?: string | URL);
    hash: string;
    host: string;
    hostname: string;
    href: string;
    origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    searchParams: URLSearchParams;
    username: string;
    toString(): string;
  }

  var URL: typeof URL;
  var URLSearchParams: typeof URLSearchParams;
}

// Global timers
declare global {
  function setTimeout(handler: () => void, timeout?: number): number;
  function clearTimeout(timeoutId: number): void;
  function setInterval(handler: () => void, timeout?: number): number;
  function clearInterval(intervalId: number): void;
  function setImmediate(handler: () => void, ...args: any[]): number;
  function clearImmediate(immediateId: number): void;
}

// Global crypto API
declare global {
  interface Crypto {
    getRandomValues<
      T extends
        | ArrayBufferView
        | Int8Array
        | Uint8Array
        | Int16Array
        | Uint16Array
        | Int32Array
        | Uint32Array
        | Uint8ClampedArray
        | Float32Array
        | Float64Array
        | DataView,
    >(array: T): T;
    randomUUID(): string;
  }

  var crypto: Crypto;
}
