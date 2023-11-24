// store/authSlice.ts
import { BACKEND_URL, userAvatarPlaceholder } from "@/Utils/placeholders";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  userName: string | null;
  userType: string | null;
  userAvatar: string | undefined;

}

const initialState: AuthState = {
  userId: null,
  userName: null,
  userType: null,
  userAvatar: undefined,

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
      state.userAvatar = action.payload.userAvatar;

    },
  },
});

export default LoginSlice.reducer;
export const { setUser } = LoginSlice.actions;
