import { ICommodityData, ICommoditySlugData } from "@/types/commodities";
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
export const getCommodityBySlug = async (
  slug: string
): Promise<ICommoditySlugData> => {
  try {
    const response = await axiosInstance.get<ICommoditySlugData>(
      `commodities/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCommodityByName = async (
  commodityName: string
): Promise<ICommoditySlugData> => {
  try {
    const response = await axiosInstance.get<ICommoditySlugData>(
      `commodities/${commodityName}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
