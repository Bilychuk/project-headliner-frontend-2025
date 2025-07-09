import s from './RecipeDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/recipes/operations.js';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectFavoriteRecipeIds,
} from '../../redux/auth/selectors.js';
import sprite from '../../assets/icon/sprite.svg';
import toast from 'react-hot-toast';

const RecipeDetails = ({ recipe, allIngredients = [] }) => {
  const {
    title,
    thumb,
    ingredients = [],
    instructions,
    category,
    description,
    time,
    calories,
  } = recipe;

  const resolveIngredientName = id => {
    const found = allIngredients.find(ing => ing._id === id);
    return found?.name || 'Unknown ingredient';
  };
  const favoriteIds = useSelector(selectFavoriteRecipeIds);
  const isFavorite = favoriteIds.includes(recipe._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuthenticated);
  const location = useLocation();

  const handleFavorite = async () => {
    if (!isAuth) {
      navigate('/auth/login', { state: { from: location } });
      return;
    }

    try {
      const resultAction = await dispatch(toggleFavorite(recipe._id));

      if (toggleFavorite.rejected.match(resultAction)) {
        toast.error('Failed to update favorites. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.topContainer}>
        <h1 className={s.header}>{title}</h1>

        {thumb ? (
          <picture className={s.image}>
            <source
              media="(min-width: 1440px)"
              srcSet={thumb.replace('/preview/', '/preview/large/')}
            />
            <img src={thumb} alt={title} className={s.image} />
          </picture>
        ) : (
          <div className={s.imagePlaceholder}>No image</div>
        )}
      </div>

      <div className={s.recipeBodyContainer}>
        <div className={s.metaContainer}>
          <div className={s.meta}>
            <h3>General information:</h3>
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Cooking Time:</strong> {time} minutes
            </p>
            {calories && (
              <p>
                <strong>Caloric content:</strong> {calories} calories
              </p>
            )}
          </div>

          <button onClick={handleFavorite} className={s.favoriteBtn}>
            {isFavorite ? 'Remove' : 'Save'}
            <svg className={s.favIcon}>
              <use href={`${sprite}#icon-favorites-white`} />
            </svg>
          </button>
        </div>

        <div className={s.recipeDetails}>
          <div className={s.about}>
            <h3 className={s.h3}>About recipe</h3>
            <p className={s.p}>{description}</p>
          </div>

          <div className={s.ingredients}>
            <h3 className={s.h3}>Ingredients:</h3>
            <ul>
              {ingredients.map((item, i) => (
                <li key={i}>
                  &#x2027; {resolveIngredientName(item.id)} — {item.measure}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.prepSteps}>
            <h3 className={s.h3}>Preparation steps:</h3>
            {instructions
              .split(/\r?\n/)
              .filter(p => p.trim() !== '')
              .map((step, index) => (
                <p className={s.instructionsP} key={index}>
                  {step.trim()}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
