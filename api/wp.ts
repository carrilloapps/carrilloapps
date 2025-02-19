import axios, { AxiosInstance, AxiosError } from "axios";

// Define custom error types for better error handling
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

interface AuthResponse {
  token: string;
  user_email?: string;
  user_nicename?: string;
}

const TOKEN_KEY = 'jwtToken';

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.carrillo.app/wp-json",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // You might want to redirect to login page here
    }
    return Promise.reject(error);
  }
);

/**
 * Authenticates a user with the WordPress JWT auth endpoint
 * @param username User's username or email
 * @param password User's password
 * @throws {AuthenticationError} When authentication fails
 */
export const authenticateUser = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const response = await apiClient.post<AuthResponse>("/jwt-auth/v1/token", {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AuthenticationError(
        error.response?.data?.message || 'Authentication failed'
      );
    }
    throw error;
  }
};

/**
 * Checks if the user is currently authenticated
 * @returns {boolean} True if the user has a stored token
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

/**
 * Logs out the current user by removing the stored token
 */
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export default apiClient;
