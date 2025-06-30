export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthRefreshToken = (state) => state.auth.refreshToken;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

// Композитні селектори
export const selectAuthState = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
  refreshToken: state.auth.refreshToken,
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

export const selectIsAuthenticated = (state) => 
  state.auth.isLoggedIn && state.auth.token !== null;
