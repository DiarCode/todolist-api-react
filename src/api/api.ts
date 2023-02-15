import axios from "axios";
import { QueryClient } from "react-query";

export const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080/api/v1";

export const $api = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(res => {
  if (res) {
    return res.data;
  }
});

export const queryClient = new QueryClient();
