import { axiosInstance } from "../api";
import { ITransactionData } from "@/types/Transaction.types";

export const getAllUserTransaction = async () => {
  try {
    const response = await axiosInstance.get<ITransactionData>(`transactions`);
    return response.data.data;
  } catch (error: any) {
    console.error(error);
    throw error.response.data;
  }
};
