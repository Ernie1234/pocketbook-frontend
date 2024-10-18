import { ICommodity } from "./commodity.types";

// Define type for the main data structure
export interface IPortfolio {
  commodityName: string;
  commodityId: ICommodity;
  balance: number;
  totalQuantity: number;
  userId: string;
  createdAt: string; // Use Date if you prefer actual Date objects
  updatedAt: string; // Use Date if you prefer actual Date objects
  id: string;
}

// Define the response type
export interface IPortfolioData {
  data: IPortfolio[];
}
