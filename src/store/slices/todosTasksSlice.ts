import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodoCategory } from "src/types/todos/category.type";
import { ITodo } from "src/types/todos/todo.type";

// Define a type for the slice state
interface CategoriesTasksState {
  category: ITodoCategory | null;
  todos: ITodo[];
  filter: string;
}

// Define the initial state using that type
const initialState: CategoriesTasksState = {
  category: null,
  todos: [],
  filter: "ALL",
};

export const categoriesTasksSlice = createSlice({
  name: "categoriesTasksSlice",
  initialState,
  reducers: {
    initTodos: (state, action: PayloadAction<{ todos: ITodo[] }>) => {
      state.todos = action.payload.todos;
    },
    selectCategory: (
      state,
      action: PayloadAction<{ todos: ITodo[]; category: ITodoCategory }>
    ) => {
      state.category = action.payload.category;
      const allTodos = action.payload.todos;

      const filteredTodos =
        allTodos?.filter(todo => todo?.category_id === state.category?.id) ||
        [];

      state.todos = filteredTodos;
    },
    resetCategories: (state, action: PayloadAction<{ todos: ITodo[] }>) => {
      state.category = null;
      state.todos = action.payload.todos || [];
      state.filter = "ALL";
    },
    onFilterChange: (
      state,
      action: PayloadAction<{ initialTodos: ITodo[]; filter: string }>
    ) => {
      const filterValue = action.payload.filter;
      const initialTodos = action.payload.initialTodos;

      if (filterValue === "ACTIVE") {
        state.todos =
          initialTodos.filter(todo => todo.completed === false) || [];
      } else if (filterValue === "PRIMARY") {
        state.todos = initialTodos.filter(todo => todo.is_prior === true) || [];
      } else if (filterValue === "ALL") {
        state.todos =
          initialTodos.filter(
            todo => todo?.category_id === state.category?.id
          ) || initialTodos;
      }

      state.filter = filterValue;
    },
  },
});

export default categoriesTasksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategory = (state: RootState) =>
  state.categoryTasksSlice.category;

export const selectTodos = (state: RootState) => state.categoryTasksSlice.todos;

export const selectFilterState = (state: RootState) =>
  state.categoryTasksSlice.filter;

export const categoriesTasksReducer = categoriesTasksSlice.reducer;
