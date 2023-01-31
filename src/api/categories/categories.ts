import { IApiResponse } from "src/types/response/apiResponse";
import { $api } from "../api";

export const getTodoCategories = async () => {
  const res = (await $api.get("/todo-categories")) as IApiResponse;
  return res;
};

export const creaeteTodoCategory = async (dto: {
  value: string;
  color: string;
  userId: number;
}) => {
  const res = (await $api.post("/todo-categories", dto)) as IApiResponse;
  return res;
};
