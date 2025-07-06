import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

// Додати рецепт у улюблені
export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await api.post(`/api/favorites/${recipeId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add to favorites'
      );
    }
  }
);


// Видалити рецепт з улюблених
export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/api/favorites/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to remove from favorites'
      );
    }
  }
);