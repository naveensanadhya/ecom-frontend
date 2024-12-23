import axios from "axios";
import Router from "next/navigation";

const isBrowser = typeof window !== "undefined";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.response) {
      if (isBrowser && error?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return Promise.reject(error?.response?.data);
    }
    return Promise.reject(error?.message);
  }
);
export default api;
