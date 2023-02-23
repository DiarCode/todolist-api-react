import { IApiResponse } from "src/types/response/apiResponse";
import { $api } from "../api";

export const getUserById = async (id: number): Promise<IApiResponse> => {
  const res = (await $api.get(`/users/${id}`)) as IApiResponse;
  return res;
};

export const uploadAvatarByUserId = async (
  id: number,
  formData: FormData
): Promise<IApiResponse> => {
  const res = (await $api.post(
    `/users/${id}/avatars`,
    formData
  )) as IApiResponse;
  
  return res;
};
