import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IToWatchCategory } from "src/types/towatch/towatch_category.type";
import { IToWatch } from "src/types/towatch/towatch.type";
import { TOWATCHES_FILTERS } from "src/constants/filters";

interface TowatchSliceState {
  category: IToWatchCategory | null;
  initialCategories: IToWatchCategory[];
  initialTowatches: IToWatch[];
  towatches: IToWatch[];
  filter: string;
}

const initialState: TowatchSliceState = {
  category: null,
  initialCategories: [],
  initialTowatches: [],
  towatches: [],
  filter: TOWATCHES_FILTERS.ALL,
};

export const towatchesSlice = createSlice({
  name: "towatchesSlice",
  initialState,
  reducers: {
    fillInitialCategories: (
      state,
      action: PayloadAction<{ categories: IToWatchCategory[] }>
    ) => {
      state.initialCategories = [...action.payload.categories];
    },
    removeFromInitialCategories: (
      state,
      action: PayloadAction<{ category: IToWatchCategory }>
    ) => {
      const category = action.payload.category;
      state.initialCategories = state.initialCategories.filter(
        c => c.id !== category.id
      );
    },
    addTowatch: (
      state,
      action: PayloadAction<{ towatch: IToWatch; category: IToWatchCategory }>
    ) => {
      const towatch = action.payload.towatch;
      const category = action.payload.category;

      if (state.category?.id === category.id) {
        if (state.category.towatches === undefined) {
          state.category.towatches = [towatch];
        } else {
          state.category.towatches = [...state.category.towatches, towatch];
        }
      }
    },
    removeTowatch: (
      state,
      action: PayloadAction<{ towatch: IToWatch; category: IToWatchCategory }>
    ) => {
      const towatch = action.payload.towatch;
      const category = action.payload.category;

      if (state.category?.id === category.id) {
        state.towatches = state.towatches.filter(t => t.id !== towatch.id);
        state.initialTowatches = state.towatches;
      }
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
      state.filter = TOWATCHES_FILTERS.ALL;
    },
    onFilterChange: (state, action: PayloadAction<{ filter: string }>) => {
      const filterValue = action.payload.filter;
      state.filter = filterValue;
      const initialTowatches = [...state.initialTowatches];

      if (filterValue === TOWATCHES_FILTERS.ALL) {
        state.towatches = initialTowatches;
        return;
      }
      if (filterValue === TOWATCHES_FILTERS.NEW) {
        state.towatches = initialTowatches.sort((a, b) => {
          var dateA = new Date(a.start_date).getTime();
          var dateB = new Date(b.start_date).getTime();
          return dateA < dateB ? 1 : -1;
        });
        return;
      }
      if (filterValue === TOWATCHES_FILTERS.POPULAR) {
        state.towatches = initialTowatches.sort((a, b) => {
          return a.rating < b.rating ? 1 : -1;
        });
        return;
      }
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

export const selectInitialTowatchCategories = (state: RootState) =>
  state.towatchesSlice.initialCategories;

export const selectTowatchFilterState = (state: RootState) =>
  state.towatchesSlice.filter;

export const towatchesSliceReducer = towatchesSlice.reducer;
