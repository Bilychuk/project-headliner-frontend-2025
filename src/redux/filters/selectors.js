export const selectCategories = state => state.filters.categories;
export const selectIngredients = state => state.filters.ingredients;
export const selectFiltersLoading = state => state.filters.loading;

// Селектор для стану помилки фільтрів
export const selectFiltersError = state => state.filters.error;
