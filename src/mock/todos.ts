import { ITodo } from "src/types/todos/todo.type";

export const todosData: ITodo[] = [
  {
    id: 1,
    title: "Implement task sorting",
    created_at: "Mar 12 2012 10:00:00 AM",
    completed: false,
    category_id: 1,
    is_prior: false,
  },
  {
    id: 2,
    title: "Finish design for new webiste",
    created_at: "Mar 13 2012 10:00:00 AM",
    completed: false,
    category_id: 4,
    is_prior: false,
  },
  {
    id: 3,
    title: "Correct mail sending form",
    created_at: "Mar 14 2012 10:00:00 AM",
    completed: false,
    category_id: 1,
    is_prior: false,
  },
  {
    id: 4,
    title: "Implement task sorting",
    created_at: "Mar 15 2012 10:00:00 AM",
    completed: false,
    category_id: 2,
    is_prior: false,
  },
  {
    id: 5,
    title: "Finish design for new webiste",
    created_at: "Mar 16 2012 10:00:00 AM",
    completed: false,
    category_id: 2,
    is_prior: true,
  },
  {
    id: 6,
    title: "Correct mail sending form",
    created_at: "Mar 18 2012 10:00:00 AM",
    completed: true,
    category_id: 1,
    is_prior: false,
  },
];
