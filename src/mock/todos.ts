import { ITodo } from "src/types/todos/todo.type";

export const todosData: ITodo[] = [
  {
    id: 1,
    title: "Implement task sorting",
    created_at: Date.now(),
    completed: false,
    category_id: null,
    is_prior: false,
  },
  {
    id: 2,
    title: "Finish design for new webiste",
    created_at: Date.now(),
    completed: false,
    category_id: null,
    is_prior: false,
  },
  {
    id: 3,
    title: "Correct mail sending form",
    created_at: Date.now(),
    completed: false,
    category_id: 1,
    is_prior: false,
  },
  {
    id: 4,
    title: "Implement task sorting",
    created_at: Date.now(),
    completed: false,
    category_id: 2,
    is_prior: false,
  },
  {
    id: 5,
    title: "Finish design for new webiste",
    created_at: Date.now(),
    completed: false,
    category_id: 2,
    is_prior: true,
  },
  {
    id: 6,
    title: "Correct mail sending form",
    created_at: Date.now(),
    completed: true,
    category_id: 1,
    is_prior: false,
  },
];
