import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '../redux/modal/slice.js';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

import authReducer from './auth/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
