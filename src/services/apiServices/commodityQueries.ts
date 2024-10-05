import { ICommodity, ICommodityData } from "@/types/commodities";
import { axiosInstance } from "../api";

export const getAllCommodities = async () => {
  try {
    const response = await axiosInstance.get<ICommodityData>(`commodities`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCommodityBySlug = async (slug: string): Promise<ICommodity> => {
  try {
    const response = await axiosInstance.get<ICommodity>(`commodities/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
