import axios from "axios";
import { IApiResponse } from "src/types/response/apiResponse";

export const BASE_URL = "http://127.0.0.1:8080/api/v1";

export const $api = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

// $api.interceptors.request.use(config => {
//   config.headers["Authorization"] = `Bearer ${localStorage.getItem(
//     "access_token"
//   )}`;
//   return config;
// });

$api.interceptors.response.use(res => {
  return res.data;
});
