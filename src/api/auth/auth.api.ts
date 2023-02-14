import { ILogin, ISignup } from "src/types/auth/user.type";
import { $api } from "../api";
import { IApiResponse } from "src/types/response/apiResponse";

export const login = async (data: ILogin): Promise<IApiResponse> => {
  const res = (await $api.post("/auth/login", data)) as IApiResponse;
  return res;
};

export const signup = async (data: ISignup): Promise<IApiResponse> => {
  const res = (await $api.post("/auth/signup", data)) as IApiResponse;
  return res;
};
