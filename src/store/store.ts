import { configureStore } from "@reduxjs/toolkit";
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
export type AppDispatch = typeof store.dispatch;
