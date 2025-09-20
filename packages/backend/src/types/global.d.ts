// Global Node.js types
declare const process: {
  env: {
    [key: string]: string | undefined;
    NODE_ENV?: 'development' | 'production' | 'test';
    PORT?: string;
    DB_HOST?: string;
    DB_PORT?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;
    JWT_SECRET?: string;
    FRONTEND_URL?: string;
    RATE_LIMIT_MAX?: string;
    RATE_LIMIT_WINDOW_MS?: string;
  };
  exit: (code?: number) => never;
};

declare const console: {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
};

export {};
