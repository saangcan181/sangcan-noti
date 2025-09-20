export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 6;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= PASSWORD_MIN_LENGTH;
};

export const validateName = (name: string): boolean => {
  return name.trim().length > 0;
};

// Common response messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful',
    REGISTER: 'User registered successfully',
    LOGOUT: 'Logout successful',
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'User with this email already exists',
    VALIDATION_ERROR: 'Validation error',
    INTERNAL_ERROR: 'Internal server error',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
  },
};
