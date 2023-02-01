import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IToWatch } from "src/types/towatch/towatch.type";

// Define a type for the slice state
interface TowatchModalSliceModal {
  isCategoryModalOpen: boolean;

  isTowatchModalOpen: boolean;
  towatchItem: IToWatch | null;
}

// Define the initial state using that type
const initialState: TowatchModalSliceModal = {
  isCategoryModalOpen: false,
  isTowatchModalOpen: false,
  towatchItem: null,
};

export const towatchModalSlice = createSlice({
  name: "towatchModalSlice",
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

    showCategoryModal: state => {
      state.isCategoryModalOpen = true;
    },
    closeCategoryModal: state => {
      state.isCategoryModalOpen = false;
    },
  },
});

export default towatchModalSlice.actions;

export const selectIsTowatchModalOpen = (state: RootState) => {
  return {
    isOpen: state.towatchModal.isTowatchModalOpen,
    data: state.towatchModal.towatchItem,
  };
};

export const selectIsCreateTowatchCategoryhModalOpen = (state: RootState) =>
  state.towatchModal.isCategoryModalOpen;

export const createTowatchModalReducer = towatchModalSlice.reducer;
