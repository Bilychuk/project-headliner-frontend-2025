import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('auth/login/pending', (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase('auth/login/fulfilled', (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase('auth/login/rejected', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase('auth/register/pending', (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase('auth/register/fulfilled', (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase('auth/register/rejected', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase('auth/refresh/pending', (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase('auth/refresh/fulfilled', (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase('auth/refresh/rejected', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase('auth/fetchCurrentUser/fulfilled', (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
