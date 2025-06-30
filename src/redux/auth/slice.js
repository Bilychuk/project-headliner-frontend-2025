import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logoutAction(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { login, logoutAction } = authSlice.actions;
export default authSlice.reducer;
