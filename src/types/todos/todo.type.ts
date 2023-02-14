export interface ITodo {
  id: number;
  title: string;
  created_at: string;
  category_id: number;
  priority: boolean;
}

export interface CreateTodoDto {
  title: string;
  priority: boolean;
  user_id: number;
  category_id: number;
}
