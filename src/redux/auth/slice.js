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
  extraReducers: builder => {
    builder
      .addCase('auth/login/pending', state => {
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
      .addCase('auth/register/pending', state => {
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
      .addCase('auth/refresh/pending', state => {
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
      .addCase('auth/fetchCurrentUser/pending', state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase('auth/fetchCurrentUser/fulfilled', (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase('auth/fetchCurrentUser/rejected', (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase('auth/logout/pending', state => {
        state.isLoading = true;
      })
      .addCase('auth/logout/fulfilled', state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase('auth/logout/rejected', state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { login, logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [], // масив id улюблених рецептів
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.items.includes(action.payload)) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(id => id !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;