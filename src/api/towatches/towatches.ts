import { IApiResponse } from "src/types/response/apiResponse";
import { $api } from "../api";

export const getAllTowatches = async (userId: number) => {
  const res = (await $api.get("/towatch", {
    params: { user: userId },
  })) as IApiResponse;

  return res;
};

export const getTowatchesByCategory = async (
  categoryId: number,
  userId: number
) => {
  const res = (await $api.get(`/towatch/category/${categoryId}`, {
    params: { user: userId },
  })) as IApiResponse;

  return res;
};
