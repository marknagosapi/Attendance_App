// store/authSlice.ts
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  error: string | null;
}

const initialState: AuthState = {
  userId: null,
  error: null,
};

// Login Slice

const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state,action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId
      state.error = action.payload.error
    }
  },
});

export default LoginSlice.reducer;
export const {setUser} = LoginSlice.actions;
