import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { logout } from './slice';

// API base URL (заміни на свій бекенд URL)
const API_BASE_URL = 'https://your-backend-api.com/api';

// Helper для API запитів
const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Login operation
export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post('/api/auth/login', formData);
      if (data.data?.accessToken) localStorage.setItem('accessToken', data.data.accessToken);
      if (data.data?.refreshToken) localStorage.setItem('refreshToken', data.data.refreshToken);
      const user = await thunkAPI.dispatch(fetchCurrentUser()).unwrap();
      return {
        user,
        token: data.data?.accessToken || null,
        refreshToken: data.data?.refreshToken || null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Register operation
export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post('/api/auth/register', formData);
      if (data.data?.accessToken) localStorage.setItem('accessToken', data.data.accessToken);
      if (data.data?.refreshToken) localStorage.setItem('refreshToken', data.data.refreshToken);
      await thunkAPI.dispatch(login({ email: formData.email, password: formData.password }));
      const user = await thunkAPI.dispatch(fetchCurrentUser()).unwrap();
      return { user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Refresh token operation
export const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const { data } = await api.post('/api/auth/refresh', { refreshToken });
      if (data.data?.accessToken) localStorage.setItem('accessToken', data.data.accessToken);
      if (data.data?.refreshToken) localStorage.setItem('refreshToken', data.data.refreshToken);
      const user = await thunkAPI.dispatch(fetchCurrentUser()).unwrap();
      return {
        user,
        token: data.data?.accessToken || null,
        refreshToken: data.data?.refreshToken || null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Token refresh failed');
    }
  }
);

// Auto login з localStorage
export const autoLogin = () => async (dispatch) => {
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (token && refreshToken) {
    try {
      const user = await dispatch(fetchCurrentUser()).unwrap();
      dispatch({
        type: 'auth/login/fulfilled',
        payload: {
          user,
          token,
          refreshToken,
        },
      });
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
    }
  }
};

// Interceptor для автоматичного refresh токена
export const setupAuthInterceptor = () => (dispatch) => {
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
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);
