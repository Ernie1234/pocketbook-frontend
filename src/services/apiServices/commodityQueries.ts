import { ICommodityData } from "@/types/commodities";
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
