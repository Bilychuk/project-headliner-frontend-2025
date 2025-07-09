import { useCallback, useEffect, useRef, useState } from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecipes,
  selectRecipesError,
  selectRecipesLoading,
  selectTotalRecipes,
} from '../../redux/recipes/selectors-all-recipes.js';
import { selectFiltersError } from '../../redux/filters/selectors.js';
import { fetchRecipes } from '../../redux/recipes/operations.js';
import Filters from '../../components/Filters/Filters.jsx';
import FiltersModal from '../../components/FiltersModal/FiltersModal.jsx';

import Loader from '../../components/Loader/Loader.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import styles from './MainPage.module.css';
import { toast } from 'react-toastify';

import Pagination from '../../components/Pagination/Pagination.jsx';

const RECIPES_PER_PAGE = 12;

export default function MainPage() {
  const dispatch = useDispatch();

  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalRecipes);
  const recipesLoading = useSelector(selectRecipesLoading);
  const recipesError = useSelector(selectRecipesError);
  const filtersError = useSelector(selectFiltersError);

  const [currentFilters, setCurrentFilters] = useState({
    category: '',
    ingredient: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

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

  // обробник для кнопки "Load More"
  const handleLoadMore = () => setPage(prev => prev + 1);

  const loadRecipesRef = useRef();
  const loadRecipes = useCallback(() => {
    dispatch(
      fetchRecipes({
        category: currentFilters.category,
        ingredient: currentFilters.ingredient,
        search: searchQuery,
        page: page,
        perPage: RECIPES_PER_PAGE,
      })
    );
  }, [
    dispatch,
    currentFilters.category,
    currentFilters.ingredient,
    searchQuery,
    page,
    RECIPES_PER_PAGE,
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
    if (recipesError) {
      toast.error(
        `Error loading recipes: ${recipesError.message || 'Unknown error'}`,
        { position: 'top-right' }
      );
    }
  }, [recipesError]);

  useEffect(() => {
    if (filtersError) {
      toast.error(
        `Error loading filters: ${filtersError.message || 'Unknown error'}`,
        { position: 'top-right' }
      );
    }
  }, [filtersError]);

  return (
    <section className={styles.section}>
      <div className={styles.mainPageContainer}>
        <Hero onSearch={handleSearch} searchQuery={searchQuery} />
        {searchQuery ? (
          <h1
            className={styles.pageTitle}
          >{`Search Results for “${searchQuery}”`}</h1>
        ) : (
          <h1 className={styles.pageTitle}>Recipes</h1>
        )}
        <div className={styles.filtersAndCountWrapper}>
          {!recipesLoading && !recipesError && (
            <>
              {totalRecipes > 0 ? (
                <p className={styles.recipeCount}>
                  {totalRecipes} {totalRecipes === 1 ? 'recipe' : 'recipes'}
                </p>
              ) : (
                <p>Sorry, no recipes match your search.</p>
              )}
            </>
          )}
          <Filters
            onApplyFilters={handleApplyFilters}
            currentFilters={currentFilters}
            onResetAndCloseFilters={handleResetAndCloseFilters}
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
        {recipesLoading && <Loader />}
        <div>
          {!recipesLoading && !recipesError && recipes.length > 0 && (
            <RecipeList recipes={recipes} type="all" />
          )}
        </div>
        {totalRecipes > recipes.length && !recipesLoading && (
          <LoadMoreBtn
            onClick={handleLoadMore}
            isLoading={recipesLoading}
            style={{ display: 'none' }}
          />
        )}
        {recipes.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalRecipes / RECIPES_PER_PAGE)}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
}
