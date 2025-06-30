import { createSlice } from '@reduxjs/toolkit';
// import { logout } from './operations.js';

const initialState = {
  user: null,
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
});

export const { openLogoutModal, closeLogoutModal } = modalSlice.actions;
export default modalSlice.reducer;
