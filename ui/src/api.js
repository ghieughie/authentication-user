import axios from "axios";
import { getCookie } from "@/helper.js";

const api = axios.create({ baseURL: import.meta.env.APP_API_URL });
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const register = (params) => {
  return api.post(`register`, params);
};
export const login = (params) => {
  return api.post(`signin`, params);
};
export const getMe = (params) => {
  return api.post(`me`, params);
};
