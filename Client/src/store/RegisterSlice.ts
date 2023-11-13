// store/registerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;

}

const initialState: AuthState = {
  userId: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegistered: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
   
    },
  },
});

export default registerSlice.reducer;
export const { setRegistered } = registerSlice.actions;
