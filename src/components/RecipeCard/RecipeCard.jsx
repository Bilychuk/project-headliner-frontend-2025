import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectFavoriteRecipeIds,
} from '../../redux/auth/selectors';
import { toggleFavorite } from '../../redux/recipes/operations';
import styles from './RecipeCard.module.css';
import { toast } from 'react-toastify';
import sprite from '../../assets/icon/sprite.svg';

const RecipeCard = ({ recipe, type, onRemove }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsAuthenticated);
  const favoriteIds = useSelector(selectFavoriteRecipeIds);
  const isFavorite = favoriteIds.includes(recipe._id);
  const calories = recipe.calories;

  const handleLoadMore = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleFavorite = async () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
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

  const renderCalories = () => {
    const cals = recipe.calories;
    if (!cals) return '- cals';

    const calsStr = String(cals).trim();
    if (calsStr.startsWith('~')) {
      return `${calsStr} cals`;
    }
    return `~${calsStr} cals`;
  };

  return (
    <article className={styles.card}>
      {recipe.thumb && (
        <img
          src={recipe.thumb}
          alt={recipe.title}
          loading="lazy"
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <p className={styles.title}>{recipe.title}</p>
          <div className={styles.timeBox}>
            <svg className={styles.timeIcon}>
              <use href={`${sprite}#icon-clock`} />
            </svg>
            <span className={styles.time}> {recipe.time} </span>
          </div>
        </div>
        {recipe.description && (
          <p className={styles.description}>{recipe.description}</p>
        )}
        {calories && <p className={styles.calories}> {renderCalories()}</p>}
        <div className={styles.buttons}>
          <button
            className={`${styles.learnMoreBtn} ${
              type === 'own' ? styles.learnMoreBtnOwn : ''
            }`}
            onClick={handleLoadMore}
          >
            Learn more
          </button>
          {type === 'favorites' ? (
            <button
              className={`${styles.saveBtn} ${styles.favBtn}`}
              onClick={() => onRemove(recipe._id)}
              aria-label="Remove from favorites"
            >
              <svg className={styles.iconFavorite}>
                <use href={`${sprite}#icon-favorites-white`} />
              </svg>
            </button>
          ) : type === 'own' ? null : (
            <button
              className={`${styles.saveBtn} ${
                isFavorite ? styles.activeIcon : ''
              }`}
              onClick={handleFavorite}
              aria-label="Save recipe"
            >
              <svg
                className={`${styles.iconFavorite} ${
                  isFavorite ? styles.activeIcon : ''
                }`}
              >
                <use href={`${sprite}#icon-favorites-black`} />
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
