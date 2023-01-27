import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "src/types/auth/user.type";

// Define a type for the slice state
interface AuthSliceState {
  user: IUser | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: AuthSliceState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeAuth: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice.actions;

export const selectAuthUser = (state: RootState) => state.authSlice.user;
export const selectAuthToken = (state: RootState) => state.authSlice.token;

export const authReducer = authSlice.reducer;
