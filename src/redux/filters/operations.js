import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const fetchCategories = createAsyncThunk(
  'filters/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/categories');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchIngredients = createAsyncThunk(
  'filters/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/ingredients');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
