export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  created_at: number;
  category_id: number | null;
  is_prior: boolean;
}
