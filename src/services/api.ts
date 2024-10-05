import axios from "axios";

const baseUrl =
  import.meta.env.VITE_APP_NODE === "production"
    ? import.meta.env.VITE_APP_API_BASE_URL
    : import.meta.env.VITE_APP_BASE_URL;

const BASE_URL = baseUrl;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
