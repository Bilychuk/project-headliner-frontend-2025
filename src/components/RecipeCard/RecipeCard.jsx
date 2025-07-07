import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import { removeFavoriteAPI } from '../../api/recipes';
import { toast } from 'react-toastify';

const RecipeCard = ({ recipe, type }) => {
  const navigate = useNavigate();

  const handleLoadMore = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleSave = () => {
    navigate('/login');
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
            {/* <ClockIcon className={styles.timeIcon} /> */}
            <span className={styles.time}> {recipe.time} </span>
          </div>
        </div>

        {recipe.description && (
          <p className={styles.description}>{recipe.description}</p>
        )}

        <div className={styles.buttons}>
          <button className={styles.learnMoreBtn} onClick={handleLoadMore}>
            Learn more
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            aria-label="Save recipe"
          >
            ❤️
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
