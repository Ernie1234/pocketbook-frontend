import { ERole } from "./user";

// Define the Price interface
export interface IPrice {
  price: number; // The price of the commodity
  commodityId: string; // Reference to the commodity ID
  createdAt: Date; // Date when the price was created
  updatedAt: Date; // Date when the price was updated
  id: string; // Unique identifier for the price entry
}

// Define the Commodity interface
export interface ICommodity {
  _id: string; // Unique identifier for the commodity
  commodityName: string; // Name of the commodity
  description: string; // Description of the commodity
  prices: IPrice[]; // Array of prices associated with the commodity
  unit: string; // Unit of measurement (e.g., ton)
  color: string; // Color representation (e.g., hex code)
  quantity: number; // Quantity of the commodity
  userId: string; // ID of the user associated with the commodity
  createdAt: Date; // Date when the commodity was created
  updatedAt: Date; // Date when the commodity was updated
  slug: string; // Slug for the commodity, often used in URLs
  __v: number; // Version key for Mongoose documents
}

// Define the CommoditySlug interface
export interface ICommoditySlugData {
  data: ICommodity; // The commodity associated with the slug
}

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

export interface IUser {
  _id: string; // Unique identifier for the user
  name: string; // Username of the user
  email: string; // Email address of the user
  password: string; // Password for the user
  commodities: ICommodity[]; // Array of commodities associated with the user
  role: ERole; // Role of the user (e.g., admin, user)
  createdAt: Date; // Date when the user was created
  updatedAt: Date; // Date when the user was updated
  __v: number; // Version key for Mongoose documents
}

// Define a type for the overall data structure
export interface ICommodityData {
  data: ICommodity[]; // Array of commodities
}
