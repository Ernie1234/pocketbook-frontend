import { ICommodityData, ICommoditySlugData } from "@/types/commodities";
import { axiosInstance } from "../api";
import { commodityFormSchema, editCommodityFormSchema } from "@/utils/schema";
import * as z from "zod";

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

export const postCommodity = async (
  values: z.infer<typeof commodityFormSchema>
) => {
  try {
    const response = await axiosInstance.post("/commodities", values);
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    throw error.response.data;
  }
};
export const updateCommodity = async (
  values: z.infer<typeof editCommodityFormSchema>
) => {
  try {
    const response = await axiosInstance.put("/commodities", values);
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    throw error.response.data;
  }
};
