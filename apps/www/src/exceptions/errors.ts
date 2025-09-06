export class PostQueryError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'PostQueryError';
    if (cause instanceof Error) {
      this.stack = cause.stack;
    }
  }
}

export class ProjectQueryError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'ProjectQueryError';
    if (cause instanceof Error) {
      this.stack = cause.stack;
    }
  }
}
