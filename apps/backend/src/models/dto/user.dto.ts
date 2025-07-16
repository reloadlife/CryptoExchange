import { z } from "zod"

// Update User Profile DTO
export const UpdateUserDto = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters")
      .optional(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters")
      .optional(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  })

export type UpdateUserDto = z.infer<typeof UpdateUserDto>

// User Response DTO
export const UserResponseDto = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserResponseDto = z.infer<typeof UserResponseDto>

// User Profile DTO (more detailed)
export const UserProfileDto = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  stats: z
    .object({
      totalOrders: z.number(),
      totalTrades: z.number(),
      totalVolume: z.number(),
      joinedDaysAgo: z.number(),
    })
    .optional(),
})

export type UserProfileDto = z.infer<typeof UserProfileDto>

// Users Query DTO (for admin)
export const UsersQueryDto = z.object({
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "username", "email", "firstName", "lastName"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

export type UsersQueryDto = z.infer<typeof UsersQueryDto>

// User List Item DTO (for admin)
export const UserListItemDto = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  isActive: z.boolean(),
  lastLoginAt: z.date().nullable(),
  orderCount: z.number(),
  tradeCount: z.number(),
})

export type UserListItemDto = z.infer<typeof UserListItemDto>
