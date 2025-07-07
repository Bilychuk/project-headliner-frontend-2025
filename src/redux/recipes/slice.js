import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllIngredients,
  fetchRecipeById,
  toggleFavorite,
} from './operations.js';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipe: null,
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchRecipeById.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.recipe = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.recipe = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllIngredients.pending, state => {
        state.ingredients = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllIngredients.rejected, (state, action) => {
        state.ingredients = [];
        state.isLoading = false;
        console.error('Failed to load ingredients:', action.payload);
      });
  },
});

const recipeReducer = recipeSlice.reducer;
export default recipeReducer;
