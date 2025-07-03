import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout as LogoutAction } from './slice.js';
import { api } from '../../api/api';

// Login operation
export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post('/api/auth/login', formData);
      if (data.data?.accessToken)
        localStorage.setItem('accessToken', data.data.accessToken);
      if (data.data?.refreshToken)
        localStorage.setItem('refreshToken', data.data.refreshToken);
      if (data.data?.accessToken) {
        api.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
      }
      return {
        user: data.data?.user || data.data,
        token: data.data?.accessToken || null,
        refreshToken: data.data?.refreshToken || null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Register operation
export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      await api.post('/api/auth/register', formData);
      // Після реєстрації одразу логінимось
      const loginResult = await thunkAPI
        .dispatch(login({ email: formData.email, password: formData.password }))
        .unwrap();
      return loginResult;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// Refresh token operation
export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const { data } = await api.post('/api/auth/refresh', { refreshToken });
    if (data.data?.accessToken)
      localStorage.setItem('accessToken', data.data.accessToken);
    if (data.data?.refreshToken)
      localStorage.setItem('refreshToken', data.data.refreshToken);
    const user = await thunkAPI.dispatch(fetchCurrentUser()).unwrap();
    return {
      user,
      token: data.data?.accessToken || null,
      refreshToken: data.data?.refreshToken || null,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Token refresh failed'
    );
  }
});

// Auto login з localStorage
export const autoLogin = () => async dispatch => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    // api.defaults.headers.common.Authorization = `Bearer ${token}`;
    try {
      const user = await dispatch(fetchCurrentUser()).unwrap();
      dispatch({
        type: 'auth/login/fulfilled',
        payload: {
          user,
          token,
        },
      });
    } catch (error) {
      localStorage.removeItem('accessToken');
      dispatch(LogoutAction());
    }
  }
};

//Logout

export const logout = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/api/auth/logout');
  } catch (error) {
    console.error('Logout error:', error.message);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common.Authorization;
    thunkAPI.dispatch(LogoutAction());
  }
});

// Interceptor для автоматичного refresh токена
export const setupAuthInterceptor = () => dispatch => {
  // Тут можна додати логіку для автоматичного refresh токена
  // при 401 помилках
};

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/api/users/current');
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);
