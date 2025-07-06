import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRecipeByIdAPI,
  addFavoriteAPI,
  removeFavoriteAPI,
} from '../../api/recipes.js';
import { getAllIngredientsAPI } from '../../api/ingredients.js';
import { useSelector } from 'react-redux';
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
    // const isFavorite = state.recipe.recipe?.isFavorite;
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
