import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CreateTaskModal {
  isTodosModalOpen: boolean;
  isCategoryModalOpen: boolean;
}

// Define the initial state using that type
const initialState: CreateTaskModal = {
  isTodosModalOpen: false,
  isCategoryModalOpen: false,
};

export const createTaskModalSlice = createSlice({
  name: "createTaskModalSlice",
  initialState,
  reducers: {
    showTodosModal: state => {
      state.isTodosModalOpen = true;
    },
    closeTodosModal: state => {
      state.isTodosModalOpen = false;
    },

    showCategoryModal: state => {
      state.isCategoryModalOpen = true;
    },
    closeCategoryModal: state => {
      state.isCategoryModalOpen = false;
    },
  },
});

export default createTaskModalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsTodosOpen = (state: RootState) =>
  state.createTaskModal.isTodosModalOpen;

export const selectIsCategoryOpen = (state: RootState) =>
  state.createTaskModal.isCategoryModalOpen;

export const createTaskModalReducer = createTaskModalSlice.reducer;
