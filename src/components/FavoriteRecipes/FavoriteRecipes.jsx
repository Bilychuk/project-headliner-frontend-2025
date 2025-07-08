import RecipeList from '../RecipeList/RecipeList.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFavoriteRecipes,
  toggleFavorite,
} from '../../redux/recipes/operations.js';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors.js';
import { useEffect, useState } from 'react';

export default function FavoriteRecipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectFavoriteRecipes);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(fetchFavoriteRecipes({ page, limit: 12 })).then(action => {
      if (!action.payload.hasNextPage) {
        setHasMore(false);
      }
    });
  }, [page, dispatch]);

  const handleRemove = id => {
    dispatch(toggleFavorite(id)).then(() => {
      setPage(1);
      setHasMore(true);
      dispatch(fetchFavoriteRecipes({ page: 1, limit: 12 }));
    });
  };

  const loadMore = () => setPage(prev => prev + 1);

  return (
    <>
      <RecipeList recipes={recipes} type="favorites" onRemove={handleRemove} />
      {hasMore && recipes.length > 0 && <LoadMoreBtn onClick={loadMore} />}
    </>
  );
}
