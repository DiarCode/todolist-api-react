import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodoCategory } from "src/types/todos/category.type";
import { ITodo } from "src/types/todos/todo.type";
import { TODOS_FILTERS } from "src/constants/filters";

interface CategoriesTasksState {
  category: ITodoCategory | null;
  initialTodos: ITodo[];
  todos: ITodo[];
  filter: string;
}

const initialState: CategoriesTasksState = {
  category: null,
  initialTodos: [],
  todos: [],
  filter: TODOS_FILTERS.ALL,
};

export const categoriesTasksSlice = createSlice({
  name: "categoriesTasksSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ todo: ITodo }>) => {
      state.initialTodos = [...state.initialTodos, action.payload.todo];
      state.todos = [...state.todos, action.payload.todo];
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

export const selectTodos = (state: RootState) => state.categoryTasksSlice.todos;

export const selectInitialTodos = (state: RootState) =>
  state.categoryTasksSlice.initialTodos;

export const selectFilterState = (state: RootState) =>
  state.categoryTasksSlice.filter;

export const categoriesTasksReducer = categoriesTasksSlice.reducer;
