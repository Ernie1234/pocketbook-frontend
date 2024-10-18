import { axiosInstance } from "../api";
import { IPortfolioData } from "@/types/Portfolio.types";

export const getUserPortfolio = async () => {
  try {
    const response = await axiosInstance.get<IPortfolioData>(`portfolio`);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    throw error.response.data;
  }
};
