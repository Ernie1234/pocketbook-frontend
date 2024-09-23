import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080/api/v1"
    : "/api/v1";

axios.defaults.withCredentials = true;

// Define types for the user object and store state
interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;

  // Actions
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signUp: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sign-up`, {
        email,
        password,
        name,
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
      const response = await axios.post(`${API_URL}/login`, {
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

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
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
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
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
