import { login as loginAction } from './slice';

// Фейкова login-операція (імітація бекенду)
export const login = (email, password) => async (dispatch) => {
  // Тут буде запит до бекенду, поки що фейк
  const fakeToken = Math.random().toString(36).substring(2);
  const user = { email };
  dispatch(loginAction({ user, token: fakeToken }));
};

// Фейкова register-операція (імітація бекенду)
export const register = (name, email, password) => async (dispatch) => {
  const fakeToken = Math.random().toString(36).substring(2);
  const user = { name, email };
  dispatch(loginAction({ user, token: fakeToken }));
};
