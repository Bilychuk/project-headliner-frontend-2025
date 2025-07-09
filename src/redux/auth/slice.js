import { createSlice } from '@reduxjs/toolkit';
import { toggleFavorite } from '../recipes/operations.js';

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('accessToken') || null;
  } catch {
    return null;
  }
};

const initialToken = getTokenFromStorage();

const initialState = {
  user: getUserFromStorage(),
  token: initialToken,
  refreshToken: null,
  isLoggedIn: !!initialToken,
  isLoading: false,
  error: null,
  favorites: [],
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
        state.favorites = action.payload.favorites || [];
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
        state.favorites = action.payload.favorites || [];
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
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        //додавання рецепта в улюблені
        const { recipeId, action: act } = action.payload;
        if (!state.user) return;

        if (act === 'add') {
          if (!state.user.favorites.includes(recipeId)) {
            state.user.favorites.push(recipeId);
          }
        } else if (act === 'remove') {
          state.user.favorites = state.user.favorites.filter(
            id => id !== recipeId
          );
        }
      })
      .addCase(toggleFavorite.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.recipe.isfavorite = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;


