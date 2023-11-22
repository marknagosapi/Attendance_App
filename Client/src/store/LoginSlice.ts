// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  userName: string | null;
  userType: string | null;
  userPassword: string | null;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  userType: null,
  userPassword: null
};

// Login Slice

const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userType = action.payload.userType;
      state.userPassword = action.payload.userPassword
    },
  },
});

export default LoginSlice.reducer;
export const { setUser } = LoginSlice.actions;
