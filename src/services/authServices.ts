import axiosClient from "./axiosClient";
import {
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type UserProfile,
} from "../models/auth";

export const authApi = {
  getProfile: () => {
    return axiosClient.get<UserProfile>("/auth/profile");
  },

  login: (data: LoginRequest) => {
    return axiosClient.post<LoginResponse>("/auth/login", data);
  },

  register: (data: RegisterRequest) => {
    return axiosClient.post<RegisterResponse>("/users/", {
      ...data,
      name: "User KYC",
      avatar: "https://i.imgur.com/FPiPFrN.jpg",
    });
  },
};
