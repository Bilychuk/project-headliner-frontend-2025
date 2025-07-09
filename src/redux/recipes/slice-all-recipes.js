import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from './operations.js';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    loading: false,
    error: null,
    total: 0,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = action.payload.data;

        state.total = action.payload.totalItems;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const recipesReducer = recipesSlice.reducer;
export default recipesReducer;
