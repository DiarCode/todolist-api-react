import { IApiResponse } from "src/types/response/apiResponse";
import { $api } from "../api";
import { CreateTodoDto} from "src/types/todos/todo.type";

export const getAllTodos = async (userId: number) => {
  const res = (await $api.get("/todos", {
    params: { user: userId },
  })) as IApiResponse;

  return res;
};

export const getTodosByCategory = async (
  categoryId: number,
  userId: number
) => {
  const res = (await $api.get(`/todos/category/${categoryId}`, {
    params: { user: userId },
  })) as IApiResponse;

  return res;
};

export const createTodo = async (dto: CreateTodoDto) => {
  const res = (await $api.post("/todos", dto)) as IApiResponse;
  return res;
};
