import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '../redux/modal/slice.js';
import authReducer from './auth/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer, 
  },
});

export default store;
