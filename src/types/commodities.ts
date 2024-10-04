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

// Define a type for the overall data structure
export interface ICommodityData {
  data: ICommodity[]; // Array of commodities
}
