// User types
export interface User {
  id: number;
  email: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
}
