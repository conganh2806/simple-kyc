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

export interface RegisterResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: 24;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}
