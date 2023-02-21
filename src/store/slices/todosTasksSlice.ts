import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodoCategory } from "src/types/todos/category.type";
import { ITodo } from "src/types/todos/todo.type";
import { TODOS_FILTERS } from "src/constants/filters";

interface CategoriesTasksState {
  category: ITodoCategory | null;
  initialCategories: ITodoCategory[];
  initialTodos: ITodo[];
  todos: ITodo[];
  filter: string;
}

const initialState: CategoriesTasksState = {
  initialCategories: [],
  category: null,
  initialTodos: [],
  todos: [],
  filter: TODOS_FILTERS.ALL,
};

export const categoriesTasksSlice = createSlice({
  name: "categoriesTasksSlice",
  initialState,
  reducers: {
    fillInitialCategories: (
      state,
      action: PayloadAction<{ categories: ITodoCategory[] }>
    ) => {
      state.initialCategories = [...action.payload.categories];
    },
    removeFromInitialCategories: (
      state,
      action: PayloadAction<{ category: ITodoCategory }>
    ) => {
      const category = action.payload.category;
      state.initialCategories = state.initialCategories.filter(
        c => c.id !== category.id
      );
    },
    addTodo: (state, action: PayloadAction<{ todo: ITodo }>) => {
      const todo = action.payload.todo;
      if (state.category?.id === todo.category_id) {
        state.initialTodos = [...state.initialTodos, todo];
        state.todos = [...state.todos, action.payload.todo];
      }
    },
    removeTodo: (state, action: PayloadAction<{ todo: ITodo }>) => {
      const todo = action.payload.todo;
      if (state.category?.id === todo.category_id) {
        state.initialTodos = state.initialTodos.filter(t => t.id !== todo.id);
        state.todos = state.initialTodos;
      }
    },
    selectCategory: (
      state,
      action: PayloadAction<{ todos: ITodo[]; category: ITodoCategory }>
    ) => {
      state.category = action.payload.category;
      state.todos = action.payload.todos;
      state.initialTodos = action.payload.todos;
      state.filter = TODOS_FILTERS.ALL;
    },
    onFilterChange: (state, action: PayloadAction<{ filter: string }>) => {
      const filterValue = action.payload.filter;
      state.filter = filterValue;
      const initialTodos = [...state.initialTodos];

      if (filterValue === TODOS_FILTERS.NEW) {
        state.todos = initialTodos.sort((a, b) => {
          var dateA = new Date(a.created_at).getTime();
          var dateB = new Date(b.created_at).getTime();
          return dateA < dateB ? 1 : -1;
        });

        return;
      }

      if (filterValue === TODOS_FILTERS.PRIMARY) {
        state.todos = initialTodos.filter(todo => todo.priority === true);

        return;
      }

      if (filterValue === TODOS_FILTERS.ALL) {
        state.todos = state.initialTodos;
        return;
      }
    },
  },
});

export default categoriesTasksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategory = (state: RootState) =>
  state.categoryTasksSlice.category;

export const selectInitialCategories = (state: RootState) =>
  state.categoryTasksSlice.initialCategories;

export const selectTodos = (state: RootState) => state.categoryTasksSlice.todos;

export const selectInitialTodos = (state: RootState) =>
  state.categoryTasksSlice.initialTodos;

export const selectFilterState = (state: RootState) =>
  state.categoryTasksSlice.filter;

export const categoriesTasksReducer = categoriesTasksSlice.reducer;
