import { IApiResponse } from "src/types/response/apiResponse";
import { $api } from "../api";

export const getTodoCategories = async (userId: number) => {
  const res = (await $api.get("/todo-category", {
    params: {
      user: userId,
    },
  })) as IApiResponse;

  return res;
};

export const creaeteTodoCategory = async (dto: {
  value: string;
  color: string;
  user_id: number;
}) => {
  const res = (await $api.post("/todo-category", dto)) as IApiResponse;
  return res;
};

export const deleteTodoCategory = async (categoryId: number) => {
  const res = (await $api.delete(
    `/todo-category/${categoryId}`
  )) as IApiResponse;

  return res;
};

export const getTowatchCategories = async (userId: number) => {
  const res = (await $api.get("/towatch-category", {
    params: {
      user: userId,
    },
  })) as IApiResponse;

  return res;
};
