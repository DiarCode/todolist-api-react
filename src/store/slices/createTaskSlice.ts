import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CreateTaskModal {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: CreateTaskModal = {
  isOpen: false,
};

export const createTaskModalSlice = createSlice({
  name: "createTaskModalSlice",
  initialState,
  reducers: {
    showModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
  },
});

export default createTaskModalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.createTaskModal.isOpen;

export const createTaskModalReducer = createTaskModalSlice.reducer;
