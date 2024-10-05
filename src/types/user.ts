export enum ERole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// Define types for the user object and store state
export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  image: string | null;
  createdAt: string;
  role: ERole;
}
