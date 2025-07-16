import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";
import {
  UserRepository,
  type IUserRepository,
} from "../repositories/user.repository";
import type {
  RegisterDto,
  LoginDto,
  ChangePasswordDto,
  AuthResponseDto,
} from "../models/dto/auth.dto";
import type { ServiceResult, JWTPayload } from "../types/common";
import { AppError } from "../types/common";
import env from "../config/env";
import logger from "../config/logger";

export interface IAuthService {
  register(data: RegisterDto): Promise<ServiceResult<AuthResponseDto>>;
  login(data: LoginDto): Promise<ServiceResult<AuthResponseDto>>;
  changePassword(
    userId: string,
    data: ChangePasswordDto
  ): Promise<ServiceResult<void>>;
  verifyToken(token: string): Promise<ServiceResult<JWTPayload>>;
  generateTokens(user: User): Promise<{ token: string; expiresIn: number }>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository = new UserRepository()) {}

  async register(data: RegisterDto): Promise<ServiceResult<AuthResponseDto>> {
    try {
      logger.info("User registration attempt", {
        email: data.email,
        username: data.username,
      });

      // Check if user already exists
      const existingUser = await this.userRepository.exists(
        data.email,
        data.username
      );
      if (existingUser) {
        return {
          success: false,
          error: "User with this email or username already exists",
        };
      }

      // Hash password
      const hashedPassword = await this.hashPassword(data.password);

      // Create user
      const user = await this.userRepository.create({
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
      });

      // Generate tokens
      const { token, expiresIn } = await this.generateTokens(user);

      logger.info("User registered successfully", {
        userId: user.id,
        email: user.email,
      });

      return {
        success: true,
        data: {
          token,
          expiresIn,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
          },
        },
      };
    } catch (error) {
      logger.error("Registration failed", { error: error.message, data });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      };
    }
  }

  async login(data: LoginDto): Promise<ServiceResult<AuthResponseDto>> {
    try {
      logger.info("User login attempt", { email: data.email });

      // Find user by email
      const user = await this.userRepository.findByEmail(data.email);
      if (!user) {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }

      // Verify password
      const isPasswordValid = await this.comparePassword(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        logger.warn("Invalid password attempt", { email: data.email });
        return {
          success: false,
          error: "Invalid email or password",
        };
      }

      // Generate tokens
      const { token, expiresIn } = await this.generateTokens(user);

      logger.info("User logged in successfully", {
        userId: user.id,
        email: user.email,
      });

      return {
        success: true,
        data: {
          token,
          expiresIn,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
          },
        },
      };
    } catch (error) {
      logger.error("Login failed", { error: error.message, email: data.email });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  }

  async changePassword(
    userId: string,
    data: ChangePasswordDto
  ): Promise<ServiceResult<void>> {
    try {
      logger.info("Password change attempt", { userId });

      // Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      // Verify current password
      const isCurrentPasswordValid = await this.comparePassword(
        data.currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        return {
          success: false,
          error: "Current password is incorrect",
        };
      }

      // Hash new password
      const hashedNewPassword = await this.hashPassword(data.newPassword);

      // Update password
      await this.userRepository.update(userId, {
        password: hashedNewPassword,
      });

      logger.info("Password changed successfully", { userId });

      return {
        success: true,
      };
    } catch (error) {
      logger.error("Password change failed", { error: error.message, userId });
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Password change failed",
      };
    }
  }

  async verifyToken(token: string): Promise<ServiceResult<JWTPayload>> {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as JWTPayload;

      // Verify user still exists
      const user = await this.userRepository.findById(payload.userId);
      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      return {
        success: true,
        data: payload,
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return {
          success: false,
          error: "Invalid token",
        };
      }

      if (error instanceof jwt.TokenExpiredError) {
        return {
          success: false,
          error: "Token expired",
        };
      }

      logger.error("Token verification failed", { error: error.message });
      return {
        success: false,
        error: "Token verification failed",
      };
    }
  }

  async generateTokens(
    user: User
  ): Promise<{ token: string; expiresIn: number }> {
    try {
      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
      });

      // Calculate expiration time in seconds
      const expiresIn = this.parseExpiresIn(env.JWT_EXPIRES_IN);

      return {
        token,
        expiresIn,
      };
    } catch (error) {
      logger.error("Token generation failed", {
        error: error.message,
        userId: user.id,
      });
      throw new AppError(
        "Token generation failed",
        500,
        "TOKEN_GENERATION_ERROR"
      );
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, env.BCRYPT_ROUNDS);
    } catch (error) {
      logger.error("Password hashing failed", { error: error.message });
      throw new AppError("Password hashing failed", 500, "PASSWORD_HASH_ERROR");
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      logger.error("Password comparison failed", { error: error.message });
      throw new AppError(
        "Password comparison failed",
        500,
        "PASSWORD_COMPARE_ERROR"
      );
    }
  }

  private parseExpiresIn(expiresIn: string): number {
    // Parse JWT expiration format (e.g., "7d", "24h", "60m", "3600s")
    const match = expiresIn.match(/^(\d+)([dhms])$/);
    if (!match) {
      return 7 * 24 * 60 * 60; // Default to 7 days
    }

    const [, amount, unit] = match;
    const num = parseInt(amount, 10);

    switch (unit) {
      case "d":
        return num * 24 * 60 * 60;
      case "h":
        return num * 60 * 60;
      case "m":
        return num * 60;
      case "s":
        return num;
      default:
        return 7 * 24 * 60 * 60;
    }
  }
}
