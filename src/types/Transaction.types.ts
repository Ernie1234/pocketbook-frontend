export enum Tabs {
  BOUGHT = "BOUGHT",
  SOLD = "SOLD",
  SWAP = "SWAP",
  SENT = "SENT",
  RECEIVED = "RECEIVED",
}

export type TAllTrans = {
  id: string;
  commodityName: string;
  type: Tabs;
  quantity: number | null;
  status: string | null;
  reference: string | null;
  unit: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

// Define the response type
export interface ITransactionData {
  data: TAllTrans[];
}
