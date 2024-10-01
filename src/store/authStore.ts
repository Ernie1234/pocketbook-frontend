import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_APP_BASE_URL
    : import.meta.env.VITE_APP_API_BASE_URL;
// const API_URL =
//   import.meta.env.MODE === "development"
//     ? import.meta.env.VITE_APP_BASE_URL
//     : `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1`;

axios.defaults.withCredentials = true;

// Define types for the user object and store state
interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  image: string | null;
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;

  // Actions
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signUp: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sign-up`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the error specifically if it's an AxiosError
        set({
          error: error.response?.data.message || "Error signing up",
          isLoading: false,
        });
      } else {
        // Handle unexpected errors
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sign-in`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the error specifically if it's an AxiosError
        set({
          error: error.response?.data.message || "Error signing up",
          isLoading: false,
        });
      } else {
        // Handle unexpected errors
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/sign-out`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          error: error.response?.data.message || "Error signing out",
          isLoading: false,
        });
      } else {
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verification`, {
        verificationCode: code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the error specifically if it's an AxiosError
        set({
          error: error.response?.data.message || "Error verifying mail",
          isLoading: false,
        });
      } else {
        // Handle unexpected errors
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          error: null,
          isCheckingAuth: false,
          isAuthenticated: false,

          isLoading: false,
        });
      } else {
        // Handle unexpected errors
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the error specifically if it's an AxiosError
        set({
          error: error.message || "Error signing up",
          isLoading: false,
        });
      } else {
        // Handle unexpected errors
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },
  resendCode: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resend-verification`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the error specifically if it's an AxiosError
        set({
          error: error.message || "Error signing up",
          isLoading: false,
        });
      } else {
        // Handle unexpected errors
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },

  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the error specifically if it's an AxiosError
        set({
          error: error.message || "Error signing up",
          isLoading: false,
        });
      } else {
        // Handle unexpected errors
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },
}));
