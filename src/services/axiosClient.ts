import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(`${accessToken}`);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status == 401) {
        localStorage.removeItem("accessToken");

        window.location.href = "/login";
      }
      if (error.response.status === 500) {
        console.error("Error system, please try again later");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
