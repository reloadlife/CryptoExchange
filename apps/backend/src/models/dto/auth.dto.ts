import { z } from "zod"

// Registration DTO
export const RegisterDto = z.object({
  email: z.string().email("Invalid email format"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
})

export type RegisterDto = z.infer<typeof RegisterDto>

// Login DTO
export const LoginDto = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

export type LoginDto = z.infer<typeof LoginDto>

// Change Password DTO
export const ChangePasswordDto = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(100, "New password must be less than 100 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type ChangePasswordDto = z.infer<typeof ChangePasswordDto>

// Forgot Password DTO
export const ForgotPasswordDto = z.object({
  email: z.string().email("Invalid email format"),
})

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordDto>

// Reset Password DTO
export const ResetPasswordDto = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>

// Auth Response DTO
export const AuthResponseDto = z.object({
  token: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    createdAt: z.date(),
  }),
})

export type AuthResponseDto = z.infer<typeof AuthResponseDto>

// Refresh Token DTO
export const RefreshTokenDto = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
})

export type RefreshTokenDto = z.infer<typeof RefreshTokenDto>
