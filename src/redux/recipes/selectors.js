export const selectRecipe = state => state.recipe.recipe;
export const selectRecipeIsLoading = state => state.recipe.isLoading;
export const selectRecipeError = state => state.recipe.error;
export const selectAllIngredients = state => state.recipe.ingredients;
export const selectOwnRecipes = state => state.recipe.ownRecipes;
export const selectFavoriteRecipes = state => state.recipe.favoriteRecipes;
