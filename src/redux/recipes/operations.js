import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ category, ingredient, search, page = 1, perPage = 8 }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if (category) {
        params.append('category', category);
      }
      if (ingredient) {
        params.append('ingredient', ingredient);
      }
      if (search) {
        params.append('search', search);
      }
      params.append('page', page);
      params.append('perPage', perPage);
      const response = await api.get(`/api/recipes?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
