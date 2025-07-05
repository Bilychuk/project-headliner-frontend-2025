import { api } from "./api.js";

export const getRecipeByIdAPI = async (id) => {
  const response = await api.get(`api/recipes/${id}`);
  return response.data;
};

export const addFavoriteAPI = async (id) => {
  const response = await api.post(`api/recipes/favorites/${id}`);
  return response.data;
};

export const removeFavoriteAPI = async (id) => {
  const response = await api.delete(`api/recipes/favorites/${id}`);
  return response.data;
};
