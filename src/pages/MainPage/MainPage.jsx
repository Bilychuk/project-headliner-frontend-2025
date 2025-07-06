import { useCallback, useEffect, useRef, useState } from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import s from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecipes,
  selectRecipesError,
  selectRecipesLoading,
  selectTotalRecipes,
} from '../../redux/recipes/selectors.js';
import {
  selectFiltersError,
  selectFiltersLoading,
} from '../../redux/filters/selectors.js';
import { fetchRecipes } from '../../redux/recipes/operations.js';
import {
  fetchCategories,
  fetchIngredients,
} from '../../redux/filters/operations.js';
import Filters from '../../components/Filters/Filters.jsx';
import FiltersModal from '../../components/FiltersModal/FiltersModal.jsx';

const RECIPES_PER_PAGE = 12;

export default function MainPage() {
  const dispatch = useDispatch();

  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalRecipes);
  const recipesLoading = useSelector(selectRecipesLoading);
  const recipesError = useSelector(selectRecipesError);
  const filtersLoading = useSelector(selectFiltersLoading);
  const filtersError = useSelector(selectFiltersError);

  const [currentFilters, setCurrentFilters] = useState({
    category: '',
    ingredient: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  // Функції для керування станом
  const openFiltersModal = () => setIsFiltersModalOpen(true);
  const closeFiltersModal = () => setIsFiltersModalOpen(false);

  const handleApplyFilters = ({ category, ingredient }) => {
    setCurrentFilters({ category, ingredient });
    setPage(1);
  };

  const handleResetAndCloseFilters = () => {
    setCurrentFilters({ category: '', ingredient: '' });
    setSearchQuery('');
    setPage(1);
    closeFiltersModal();
  };

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  // --- ЛОГІКА ЗАВАНТАЖЕННЯ РЕЦЕПТІВ ---
  const loadRecipesRef = useRef();
  const loadRecipes = useCallback(() => {
    dispatch(
      fetchRecipes({
        category: currentFilters.category,
        ingredient: currentFilters.ingredient,
        query: searchQuery,
        page: page,
        limit: RECIPES_PER_PAGE,
      })
    );
  }, [
    dispatch,
    currentFilters.category,
    currentFilters.ingredient,
    searchQuery,
    page,
  ]);

  useEffect(() => {
    loadRecipesRef.current = loadRecipes;
  }, [loadRecipes]);

  useEffect(() => {
    if (loadRecipesRef.current) {
      loadRecipesRef.current();
    }
  }, [currentFilters.category, currentFilters.ingredient, searchQuery, page]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  // Рендеринг
  return (
    <div className={s.mainPageContainer}>
      <h1 className={s.pageTitle}>Recipes</h1>
      <div className={s.filtersAndCountWrapper}>
        {!recipesLoading && !recipesError && (
          <>
            {totalRecipes > 0 ? (
              <p className={s.recipeCount}>
                {totalRecipes} {totalRecipes === 1 ? 'recipe' : 'recipes'}
              </p>
            ) : (
              <p>Sorry, no recipes match your search.</p>
            )}
          </>
        )}
        {/* Компоненти фільтрів та модальних вікон */}
        <Filters
          onApplyFilters={handleApplyFilters}
          currentFilters={currentFilters}
          onResetAndCloseFilters={handleResetAndCloseFilters}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          openFiltersModal={openFiltersModal}
        />
      </div>
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={closeFiltersModal}
        onApplyFilters={handleApplyFilters}
        currentFilters={currentFilters}
        onResetAndCloseFilters={handleResetAndCloseFilters}
      />

      {recipesLoading && <p>Завантаження рецептів...</p>}
      {filtersLoading && <p>Завантаження опцій фільтрів...</p>}
      {recipesError && <p>Помилка: {recipesError.message}</p>}

      {/* Контейнер для рецептів - видалено ref */}
      <div>
        {!recipesLoading && !recipesError && recipes.length > 0 && (
          <RecipeList recipes={recipes} />
        )}
      </div>

      {totalRecipes > recipes.length && !recipesLoading && (
        <LoadMoreBtn onClick={handleLoadMore} isLoading={recipesLoading} />
      )}
    </div>
  );
}
