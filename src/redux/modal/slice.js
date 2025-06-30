import { createSlice } from '@reduxjs/toolkit';
import { logout } from './operations.js';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isLogoutModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isLogoutModalOpen: false,
  },
  reducers: {
    openLogoutModal: state => {
      state.isLogoutModalOpen = true;
    },
    closeLogoutModal: state => {
      state.isLogoutModalOpen = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });
  },
});

export const { openLogoutModal, closeLogoutModal } = modalSlice.actions;
export default modalSlice.reducer;
