import RecipeList from '../RecipeList/RecipeList.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import { selectOwnRecipes } from '../../redux/recipes/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnRecipes } from '../../redux/recipes/operations.js';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function OwnRecipes() {
  const dispatch = useDispatch();
  const ownRecipes = useSelector(selectOwnRecipes);
  useEffect(() => {
    dispatch(fetchOwnRecipes({ page: 1, limit: 12 }));
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.updated) {
      dispatch(fetchOwnRecipes({ page: 1, limit: 12 }));
    }
  }, [location.state, dispatch]);

  return (
    <>
      <RecipeList recipes={ownRecipes} type="own" />
      {ownRecipes.length >= 12 && <LoadMoreBtn />}
    </>
  );
}
