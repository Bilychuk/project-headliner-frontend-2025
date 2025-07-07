import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, fetchAllIngredients } from '../../redux/recipes/operations.js';
import { selectRecipe, selectRecipeIsLoading, selectRecipeError, selectAllIngredients } from '../../redux/recipes/selectors.js';
import Loader from '../../components/Loader/Loader.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails.jsx';

const RecipeViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector(selectRecipe);
  const isLoading = useSelector(selectRecipeIsLoading);
  const error = useSelector(selectRecipeError);
  const allIngredients = useSelector(selectAllIngredients);

  

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    dispatch(fetchAllIngredients());
  }, [dispatch, id]);


  if (isLoading) return <Loader />;
  if (error || !recipe) return <NotFound />;

 
  
  return <RecipeDetails recipe={recipe} allIngredients={allIngredients} />;
};

export default RecipeViewPage;
