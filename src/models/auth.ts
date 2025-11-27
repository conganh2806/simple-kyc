export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export const UserRole = {
  User: "customer",
  Officer: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface RegisterResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: UserRole;
  id: number;
}

export interface UpdateRequest {
  name: string;
  password: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}
