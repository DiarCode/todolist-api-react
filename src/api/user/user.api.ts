import { IApiResponse } from "src/types/response/apiResponse";
import { $api } from "../api";

export const getUserById = async (id: number): Promise<IApiResponse> => {
  const res = (await $api.get(`/users/${id}`)) as IApiResponse;
  return res;
};
