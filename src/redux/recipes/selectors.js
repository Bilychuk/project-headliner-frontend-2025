export const selectRecipes = state => state.recipes.items;
export const selectTotalRecipes = state => state.recipes.total;
export const selectRecipesLoading = state => state.recipes.loading;

// Селектор для стану помилки рецептів
export const selectRecipesError = state => state.recipes.error;
