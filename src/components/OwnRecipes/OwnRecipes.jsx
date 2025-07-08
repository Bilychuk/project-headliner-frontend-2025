import RecipeList from '../RecipeList/RecipeList.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import {
  selectHasNextPage,
  selectOwnRecipes,
  selectOwnTotal,
  selectRecipeIsLoading,
} from '../../redux/recipes/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnRecipes } from '../../redux/recipes/operations.js';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import s from './OwnRecipes.module.css';
import Loader from '../Loader/Loader.jsx';

export default function OwnRecipes() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const ownRecipes = useSelector(selectOwnRecipes);
  const hasNextPage = useSelector(selectHasNextPage);
  const totalOwnRecipes = useSelector(selectOwnTotal);
  const isLoading = useSelector(selectRecipeIsLoading);

  useEffect(() => {
    dispatch(fetchOwnRecipes({ page: 1, limit: 12 }));
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.updated) {
      dispatch(fetchOwnRecipes({ page: 1, limit: 12 }));
    }
  }, [location.state, dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(fetchOwnRecipes({ page: nextPage, limit: 12 }));
    setPage(nextPage);
  };

  return (
    <>
      {ownRecipes.length > 0 && (
        <p className={s.totalItems}>{`${totalOwnRecipes} recipes`}</p>
      )}
      {isLoading && <Loader />}
      <RecipeList recipes={ownRecipes} type="own" />
      {hasNextPage && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}
