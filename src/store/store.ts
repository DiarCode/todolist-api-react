import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { createTaskModalReducer } from "./slices/createTaskSlice";
import { categoriesTasksReducer } from "./slices/todosTasksSlice";
import { createTowatchModalReducer } from "./slices/towatchModalSlice";
import { authReducer } from "./slices/authSlice";
import { towatchesSliceReducer } from "./slices/towatchSlice";

export const store = configureStore({
  reducer: {
    createTaskModal: createTaskModalReducer,
    categoryTasksSlice: categoriesTasksReducer,
    towatchModal: createTowatchModalReducer,
    authSlice: authReducer,
    towatchesSlice: towatchesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
