import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllIngredients,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
  fetchRecipeById,
  toggleFavorite,
} from './operations.js';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipe: null,
    ownRecipes: [],
    totalOwnRecipes: 0,
    favoriteRecipes: [],
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
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (state.recipe && state.recipe._id === action.payload.recipeId) {
          state.recipe.isFavorite =
            action.payload.action === 'add' ? true : false;
        }
      })
      .addCase(toggleFavorite.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.recipe.isFavorite = null;
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

        if (page === 1) {
          state.ownRecipes = recipes;
        } else {
          state.ownRecipes = [...state.ownRecipes, ...recipes];
        }

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
        state.favoriteRecipes = action.payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const recipeReducer = recipeSlice.reducer;
export default recipeReducer;
