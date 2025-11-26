import axiosClient from "./axiosClient";

export const userApi = {
  updateProfile: (userId: number, payload: any) => {
    return axiosClient.put(`/users/${userId}`, payload);
  },
};
