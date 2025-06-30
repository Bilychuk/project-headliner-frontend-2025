import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthHeader = value => {
  axios.defaults.headers.common.Authorization = value;
};

export const logout = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error.message);
  } finally {
    setAuthHeader('');
  }
});
