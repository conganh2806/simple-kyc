import axiosClient from "./axiosClient";
import {
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
} from "../models/auth";

export const authApi = {
  login: (data: LoginRequest) => {
    return axiosClient.post<LoginResponse>("/auth/login", data);
  },

  getProfile: () => {
    return axiosClient.get("/auth/profile");
  },

  register: (data: RegisterRequest) => {
    return axiosClient.post<RegisterResponse>("/users/", {
      ...data,
      name: "User KYC",
      avatar: "https://i.imgur.com/FPiPFrN.jpg",
    });
  },
};
