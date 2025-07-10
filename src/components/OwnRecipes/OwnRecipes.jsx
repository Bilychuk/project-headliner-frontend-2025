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
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import s from './OwnRecipes.module.css';
import Loader from '../Loader/Loader.jsx';
import Pagination from '../Pagination/Pagination.jsx';

export default function OwnRecipes() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const ownRecipes = useSelector(selectOwnRecipes);
  // const hasNextPage = useSelector(selectHasNextPage);
  const totalOwnRecipes = useSelector(selectOwnTotal);
  const isLoading = useSelector(selectRecipeIsLoading);
  const RECIPES_PER_PAGE = 12;
  useEffect(() => {
    dispatch(fetchOwnRecipes({ page, limit: RECIPES_PER_PAGE }));
  }, [dispatch, page]);

  const location = useLocation();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (location.state?.updated) {
      dispatch(fetchOwnRecipes({ page: 1, limit: 12 }));
    }
  }, [location.state, dispatch]);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

  // const handleLoadMore = () => {
  //   const nextPage = page + 1;
  //   dispatch(fetchOwnRecipes({ page: nextPage, limit: 12 }));
  //   setPage(nextPage);
  // };

  return (
    <>
      <div ref={sectionRef}>
        {ownRecipes.length > 0 && (
          <p className={s.totalItems}>{`${totalOwnRecipes} recipes`}</p>
        )}
      </div>
      {isLoading && <Loader />}
      <RecipeList recipes={ownRecipes} type="own" />
      {/* {hasNextPage && <LoadMoreBtn onClick={handleLoadMore} />} */}
      {ownRecipes.length > 0 && !isLoading && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalOwnRecipes / RECIPES_PER_PAGE)}
          onPageChange={setPage}
        />
      )}
    </>
  );
}
