import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllIngredients,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
  fetchRecipeById,
} from './operations.js';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipe: null,
    ownRecipes: [],
    totalOwnRecipes: 0,
    favoriteRecipes: [],
    favoriteTotal: 0,
    favoriteHasNextPage: false,
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
      })
      .addCase(fetchOwnRecipes.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { recipes, page, totalItems, hasNextPage } = action.payload;

        state.ownRecipes = recipes;

        state.totalOwnRecipes = totalItems;
        state.hasNextPage = hasNextPage;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFavoriteRecipes.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        const { recipes, page, hasNextPage, totalItems } = action.payload;

        state.favoriteRecipes = recipes;

        state.favoriteTotal = totalItems;
        state.favoriteHasNextPage = hasNextPage;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const recipeReducer = recipeSlice.reducer;
export default recipeReducer;
