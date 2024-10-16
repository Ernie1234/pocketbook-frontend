import { z } from "zod";

//USER'S LOGIN FORM ZOD SCHEMA
export const userLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
//USER'S FORGET/RESET FORM ZOD SCHEMA
export const userForgetFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
});
//USER'S NEW PASSWORD FORM ZOD SCHEMA
export const newPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const sellerFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  commodityName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
export const adminUserFormSchema = z.object({
  id: z.string(),
  role: z.string(),
  roleToggle: z.boolean(),
});

//USER'S CHANGE PASSWORD FORM ZOD SCHEMA
export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Old password is required"),
    newPassword: z.string().min(8, "New password is required"),
    confirmPassword: z.string().min(6, "Confirmation password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path to highlight the error
  });

//USER'S REGISTER FORM ZOD SCHEMA
export const userRegisterFormSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First name must be at least 1 characters.",
    }),
    lastName: z.string().min(1, {
      message: "Last name must be at least 1 characters.",
    }),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(25, { message: "Password must be less than 26 characters." }),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

//USER PROFILE DETAIL EDIT FORM ZOD SCHEMA
export const profileFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name must be at least 1 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 1 characters.",
  }),
  email: z.string().email("Invalid email address"),
  // imageUrl: z.string(),
});

//ADD COMMODITY FORM ZOD SCHEMA
export const commodityFormSchema = z.object({
  commodityName: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  quantity: z.number().min(1, {
    message: "Quantity must be greater than 0",
  }), // Ensure quantity is a number and greater than 0
  price: z.number().min(1, {
    message: "Price must be a positive number",
  }), // Ensure price is a number and greater than 0
  unit: z.string(),
  color: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
    message: "Color must be a valid hex color code (e.g., #RRGGBB or #RGB)",
  }), // Validate hex color code
});

//EDIT COMMODITY FORM ZOD SCHEMA
export const editCommodityFormSchema = z.object({
  commodityName: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  price: z.number().min(1, {
    message: "Price must be a positive number",
  }), // Ensure price is a number and greater than 0
  quantity: z.number().min(1, {
    message: "Quantity must be greater than 0",
  }), // Ensure quantity is a number and greater than 0
});
//BUY COMMODITY FORM ZOD SCHEMA
export const buyModalSchema = z.object({
  commodityName: z.string(),
  quantity: z.string(),
  paymentMethod: z.string(),
  cardNumber: z.string(),
  cardHolderName: z.string(),
  expiryDate: z.string(),
  cvc: z.string(),
});
// Define the schema using Zod
export const schema = z.object({
  commodityName: z.string().min(1, "Please select a commodity"),
  quantity: z
    .string()
    .min(1, "Quantity must be at least 1")
    .max(10, "Quantity cannot exceed 10"),
});
export const sellModalSchema = z.object({
  commodityName: z.string(),
  amount: z.string(),
  bankAcct: z.string(),
  bank: z.string(),
  acctNumber: z.string(),
});
export const swapModalSchema = z.object({
  commodityName: z.string(),
  transferTo: z.string(),
  amount: z.string(),
});
export const sendModalSchema = z.object({
  commodityName: z.string(),
  address: z.string(),
  amount: z.string(),
  note: z.string().optional(),
});
