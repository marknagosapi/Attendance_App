// store/registerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  isRegistered: boolean
}

const initialState: RegisterState = {
  isRegistered: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegistered: (state, action: PayloadAction<RegisterState>) => {
      state.isRegistered = action.payload.isRegistered;
    },
  },
});

export default registerSlice.reducer;
export const { setRegistered } = registerSlice.actions;
