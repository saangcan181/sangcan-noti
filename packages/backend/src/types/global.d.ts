declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      JWT_SECRET: string;
      FRONTEND_URL: string;
      RATE_LIMIT_MAX: string;
      RATE_LIMIT_WINDOW_MS: string;
    }
  }
}

export {};
