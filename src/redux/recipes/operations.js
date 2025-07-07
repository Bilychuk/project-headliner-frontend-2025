import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRecipeByIdAPI,
  addFavoriteAPI,
  removeFavoriteAPI,
} from '../../api/recipes.js';
import { getAllIngredientsAPI } from '../../api/ingredients.js';
import { selectFavoriteRecipeIds } from '../auth/selectors.js';

export const fetchAllIngredients = createAsyncThunk(
  'recipe/fetchAllIngredients',
  async (_, thunkAPI) => {
    try {
      const res = await getAllIngredientsAPI();
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipe/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await getRecipeByIdAPI(id);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'recipe/toggleFavorite',
  async (recipeId, thunkAPI) => {
    const state = thunkAPI.getState();
    const favoriteIds = selectFavoriteRecipeIds(state);
    const isFavorite = favoriteIds.includes(recipeId);

    try {
      if (isFavorite) {
        await removeFavoriteAPI(recipeId);
        return { recipeId, action: 'remove' };
      } else {
        await addFavoriteAPI(recipeId);
        return { recipeId, action: 'add' };
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  'recipes/fetchFavorites',
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await api.get(
        `/api/recipes/favorites?page=${page}&limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/fetchOwn',
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await api.get(
        `/api/recipes/own?page=${page}&limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
