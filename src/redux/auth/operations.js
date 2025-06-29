import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthHeader = value => {
  axios.defaults.headers.common.Authorization = value;
};

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/auth/logout');
  setAuthHeader('');
});
