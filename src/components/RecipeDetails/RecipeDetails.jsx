import s from './RecipeDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/recipes/operations.js';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/auth/selectors.js';



const RecipeDetails = ({ recipe, allIngredients=[] }) => {
  const {
    title,
    thumb,
    ingredients = [],
    instructions,
    category,
    description,
    time,
    calories,
    isFavorite,
  } = recipe;

 const resolveIngredientName = (id) => {
  const found = allIngredients.find((ing) => ing._id === id);
  return found?.name || 'Unknown ingredient';
};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuthenticated);

  const handleFavorite = () => {
    if (!isAuth) {
      navigate('/auth/login');
      return;
    }

    dispatch(toggleFavorite(recipe.id));
  };

  return (
    <div className={s.container}>
      <h1>{title}</h1>
      <img src={thumb} alt={title} className={s.image} />

      <div className={s.meta}>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Cooking Time:</strong> {time}
          </p>
          {calories && (
            <p>
              <strong>Caloric content:</strong> {calories}
            </p>
          )}
        </div>

        <button onClick={handleFavorite} className={s.favoriteBtn}>
          {isFavorite ? 'Remove' : 'Save'}
        </button>

      <div className={s.about}>
        <h3>About recipe</h3>
        <p>{description}</p>
      </div>

      <div className={s.details}>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((item, i) => (
            <li key={i}>
              {resolveIngredientName(item.id)} — {item.measure}
            </li>
          ))}
        </ul>

        <div>
          <h3>Preparation steps:</h3>
          <p>{instructions}</p>
        </div>

        
      </div>
    </div>
  );
};

export default RecipeDetails;
