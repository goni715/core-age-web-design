import { z } from "zod";
import { requiredStringSchema } from "./required.schema";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
export const fullNameRegex = /^[A-Za-z\s'.-]+$/;
export const phoneRegex = /^\+?\d{1,14}$/;


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: requiredStringSchema('Password')
    .min(6, { message: "Password must be at least 6 characters" })
    .max(60, "Password must not exceed 60 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one letter and one number",
    ),
  isRememberMe: z.boolean().optional(),
});

export type TLoginValues = z.infer<typeof loginSchema>;


export const fullNameZodSchema = requiredStringSchema('Full name')
  .regex(fullNameRegex, {
    message:
      "Full Name can only contain letters, spaces, apostrophes, hyphens, and dots.",
  });

export const emailZodSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address");

export const passwordZodSchema = requiredStringSchema('Password')
  .min(6, "Password must be at least 6 characters long")
  .max(60, "Password must not exceed 60 characters")
  .regex(
    passwordRegex,
    "Password must contain at least one letter and one number",
  )
  .trim();


export const phoneNumberZodSchema = requiredStringSchema('Phone number')
  .trim()
  .regex(phoneRegex, {
    message:
      "Please enter a valid phone number (e.g., +1234567890 or 1234567890)",
  });


export const registerSchema = z.object({
  fullName: fullNameZodSchema,
  email: emailZodSchema,
  phone: phoneNumberZodSchema,
  agencyName: requiredStringSchema("Agency name"),
  password: passwordZodSchema,
});

export type TRegisterValues = z.infer<typeof registerSchema>;

export const verifyAccountSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  otp: z
    .string()
    .min(6, "Please enter all 6 digits of the verification code")
    .max(6, "OTP must not exceed 6 digits"),
});

export type TVerifyAccountValues = z.infer<typeof verifyAccountSchema>;