import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchIngredients } from './operations.js';

const initialState = {
  categories: [],
  ingredients: [],
  loading: false, // Loading для фільтрів
  error: null, // Error для фільтрів
};

const filtersSlice = createSlice({
  name: 'filters', // Назва слайсу тепер 'filters'
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIngredients.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const filtersReducer = filtersSlice.reducer;
