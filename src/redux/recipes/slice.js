import { createSlice } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites } from './operations';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [], 
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