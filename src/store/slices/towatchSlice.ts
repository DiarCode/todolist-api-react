import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IToWatchCategory } from "src/types/towatch/towatch_category.type";
import { IToWatch } from "src/types/towatch/towatch.type";

interface TowatchSliceState {
  category: IToWatchCategory | null;
  initialTowatches: IToWatch[];
  towatches: IToWatch[];
  filter: string;
}

export const FILTERS = {
  ALL: "POPULAR",
  NEW: "RECENT",
  PRIMARY: "PUBLISHED",
};

const initialState: TowatchSliceState = {
  category: null,
  initialTowatches: [],
  towatches: [],
  filter: FILTERS.ALL,
};

export const towatchesSlice = createSlice({
  name: "towatchesSlice",
  initialState,
  reducers: {
    addTowatch: (state, action: PayloadAction<{ towatch: IToWatch }>) => {
      state.initialTowatches = [
        ...state.initialTowatches,
        action.payload.towatch,
      ];
      state.towatches = [...state.towatches, action.payload.towatch];
    },
    selectCategory: (
      state,
      action: PayloadAction<{
        towatches: IToWatch[];
        category: IToWatchCategory;
      }>
    ) => {
      state.category = action.payload.category;
      state.towatches = action.payload.towatches;
      state.initialTowatches = action.payload.towatches;
      state.filter = FILTERS.ALL;
    },
    onFilterChange: (state, action: PayloadAction<{ filter: string }>) => {
      const filterValue = action.payload.filter;
      state.filter = filterValue;
      const initialTowatches = [...state.initialTowatches];
    },
  },
});

export default towatchesSlice.actions;

export const selectTowatchCategory = (state: RootState) =>
  state.towatchesSlice.category;

export const selectTowatches = (state: RootState) =>
  state.towatchesSlice.towatches;

export const selectInitialTowatches = (state: RootState) =>
  state.towatchesSlice.initialTowatches;

export const selectTowatchFilterState = (state: RootState) =>
  state.towatchesSlice.filter;

export const towatchesSliceReducer = towatchesSlice.reducer;
