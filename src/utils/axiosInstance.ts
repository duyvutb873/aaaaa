import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "@/constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem(ACCESS_TOKEN);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGFmNDVlMTVjNzllOWNlNDk2OGMxNCIsInJvbGVzIjpbIkFETUlOSVNUUkFUT1IiXSwiaWF0IjoxNzM2OTI2NDk2LCJleHAiOjE3Mzc1MzEyOTZ9.R4MiCt27epAQsf0q0Fp5T_z-qHKpECw62Wez0ON7YgQ";
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
