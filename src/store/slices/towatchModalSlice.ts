import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IToWatch } from "src/types/towatch/towatch.type";

// Define a type for the slice state
interface TowatchModalSliceModal {
  isTowatchModalOpen: boolean;
  towatchItem: IToWatch | null;
}

// Define the initial state using that type
const initialState: TowatchModalSliceModal = {
  isTowatchModalOpen: false,
  towatchItem: null,
};

export const towatchModalSlice = createSlice({
  name: "createTaskModalSlice",
  initialState,
  reducers: {
    showTowatchModal: (
      state,
      action: PayloadAction<{ towatchItem: IToWatch }>
    ) => {
      state.isTowatchModalOpen = true;
      state.towatchItem = action.payload.towatchItem;
    },
    closeTowatchModal: state => {
      state.isTowatchModalOpen = false;
      state.towatchItem = null;
    },
  },
});

export default towatchModalSlice.actions;

export const selectIsTowatchModalOpen = (state: RootState) =>
  state.towatchModal;

export const createTowatchModalReducer = towatchModalSlice.reducer;
