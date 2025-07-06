import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ category, ingredient, query, page = 1, limit = 8 }, thunkAPI) => {
    // Додали page, limit, query
    try {
      const params = new URLSearchParams();
      if (category) {
        params.append('category', category);
      }
      if (ingredient) {
        params.append('ingredient', ingredient);
      }
      if (query) {
        params.append('query', query); // Додаємо пошуковий запит
      }
      params.append('page', page); // Додаємо номер сторінки
      params.append('limit', limit); // Додаємо ліміт рецептів на сторінці

      const response = await api.get(`/api/recipes?${params.toString()}`);
      return response.data.data; // Очікуємо { recipes: [...], total: ... }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
