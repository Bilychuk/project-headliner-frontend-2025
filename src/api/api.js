import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://tasteorama.onrender.com',
  withCredentials: false, // якщо бекенд не вимагає cookie
});

// Додаємо accessToken у всі запити, якщо він є
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
