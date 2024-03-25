// bamidele.dev😁
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.user = action.payload;
    },
    logUserOut: (state) => {
      state.user = null;
    },
  },
});

export const { signInSuccess, updateUserSuccess, logUserOut } =
  userSlice.actions;
export default userSlice.reducer;
