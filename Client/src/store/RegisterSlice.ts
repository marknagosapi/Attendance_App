// store/registerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  error: string | null;
  userName: string | null;

}

const initialState: AuthState = {
  userId: null,
  error: null,
  userName: null
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegistered: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.error = action.payload.error;
      state.userName  = action.payload.userName;
    },
  },
});

export default registerSlice.reducer;
export const { setRegistered } = registerSlice.actions;
