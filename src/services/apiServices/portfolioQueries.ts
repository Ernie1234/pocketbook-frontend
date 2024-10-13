import { IPortfolioData } from "@/types/commodities";
import { axiosInstance } from "../api";

export const getUserPortfolio = async () => {
  try {
    const response = await axiosInstance.get<IPortfolioData>(`portfolio`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
