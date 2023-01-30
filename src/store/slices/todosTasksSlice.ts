import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodoCategory } from "src/types/todos/category.type";
import { ITodo } from "src/types/todos/todo.type";

interface CategoriesTasksState {
  category: ITodoCategory | null;
  todos: ITodo[];
  filter: string;
}

const FILTERS = {
  ALL: "ALL",
  NEW: "NEW",
  PRIMARY: "PRIMARY",
};

const initialState: CategoriesTasksState = {
  category: null,
  todos: [],
  filter: FILTERS.ALL,
};

export const categoriesTasksSlice = createSlice({
  name: "categoriesTasksSlice",
  initialState,
  reducers: {
    initTodos: (state, action: PayloadAction<{ todos: ITodo[] }>) => {
      state.category = null;
      state.todos = action.payload.todos;
      state.filter = FILTERS.ALL;
    },
    selectCategory: (
      state,
      action: PayloadAction<{ todos: ITodo[]; category: ITodoCategory }>
    ) => {
      state.category = action.payload.category;
      state.todos = action.payload.todos;
      state.filter = FILTERS.ALL;
    },
    onFilterChange: (
      state,
      action: PayloadAction<{ initialTodos: ITodo[]; filter: string }>
    ) => {
      const filterValue = action.payload.filter.toUpperCase();
      const initialTodos = action.payload.initialTodos;

      if (filterValue === FILTERS.NEW) {
        //TODO: After normalization change JSON parse
        const arr = initialTodos.sort((a, b) => {
          var dateA = new Date(a.created_at).getTime();
          var dateB = new Date(b.created_at).getTime();
          return dateA > dateB ? 1 : -1;
        });

        console.log(arr);
      } else if (filterValue === FILTERS.PRIMARY) {
        state.todos = initialTodos.filter(todo => todo.is_prior === true);
      } else if (filterValue === FILTERS.ALL) {
        state.todos = initialTodos;
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
