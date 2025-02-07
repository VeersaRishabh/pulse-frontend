import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  user: {
    id?: string;
    name?: string;
    emailId?: string;
    role?: string;
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserState['user']>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUser(state, action: PayloadAction<Partial<UserState['user']>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
