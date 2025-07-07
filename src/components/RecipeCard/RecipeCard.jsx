import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/auth/selectors';
import { toggleFavorite } from '../../redux/recipes/operations';
import styles from './RecipeCard.module.css';
import { toast } from 'react-toastify';
import sprite from '../../assets/icon/sprite.svg';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsAuthenticated);
  const isFavorite = recipe.isFavorite;

  const handleLoadMore = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }
    dispatch(toggleFavorite(recipe._id));
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

  const handleRemove = async () => {
    try {
      await removeFavoriteAPI(recipe._id);
      if (onRemove) {
        onRemove(recipe._id);
      }
    } catch (error) {
      const errorMessage = error || 'Failed to remove from favorites.';
      toast.error(errorMessage, { position: 'top-right' });
    }
  };

  return (
    <article className={styles.card}>
      {recipe.thumb && (
        <img src={recipe.thumb} alt={recipe.title} className={styles.image} />
      )}

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{recipe.title}</h3>

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

        <p className={styles.calories}> {renderCalories()}</p>

        <div className={styles.buttons}>
          <button className={styles.learnMoreBtn} onClick={handleLoadMore}>
            Learn more
          </button>

          <button
            className={`${styles.saveBtn} ${
              isFavorite ? styles.activeIcon : ''
            }`}
            onClick={handleToggleFavorite}
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
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
