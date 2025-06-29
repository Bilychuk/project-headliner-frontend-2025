import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../redux/auth/slice.js';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
