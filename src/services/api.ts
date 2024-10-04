import axios from "axios";

const baseUrl =
  import.meta.env.VITE_APP_NODE === "production"
    ? import.meta.env.VITE_APP_API_BASE_URL
    : import.meta.env.VITE_APP_BASE_URL;

const BASE_URL = baseUrl;

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getAllCommodities = async () => {
  try {
    const commodities = await axiosInstance.get(`/commodities`);
    return commodities.data.map((todo: any) => todo.commodityName);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
