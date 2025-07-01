import axios from 'axios';
import { login as loginAction } from './slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Фейкова login-операція (імітація бекенду)
export const login = (email, password) => async dispatch => {
  // Тут буде запит до бекенду, поки що фейк
  const fakeToken = Math.random().toString(36).substring(2);
  const user = { email };
  dispatch(loginAction({ user, token: fakeToken }));
};

// Фейкова register-операція (імітація бекенду)
export const register = (name, email, password) => async dispatch => {
  const fakeToken = Math.random().toString(36).substring(2);
  const user = { name, email };
  dispatch(loginAction({ user, token: fakeToken }));
};

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    if (!token) return;

    const response = await axios.get('/api/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(loginAction({ user: response.data.data, token }));
  } catch (error) {
    console.error('Failed to fetch current user:', error);
  }
};

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
