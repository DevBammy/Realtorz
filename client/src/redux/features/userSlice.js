// bamidele.dev😁
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: user,
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signinFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { signInStart, signinSuccess, signinFailed } = userSlice.actions;
export default userSlice.reducer;
