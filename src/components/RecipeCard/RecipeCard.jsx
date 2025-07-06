import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  const handleSave = () => {
    navigate('/login');
  };

  // const isRecipeFavorite = false; // TODO: Це значення має приходити з пропсів або з Redux-стану користувача

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
          <button className={styles.learnMoreBtn} onClick={handleLearnMore}>
            Learn more
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            aria-label="Save recipe"
          >
            {/* Тут можна буде рендерити різні іконки в залежності від isRecipeFavorite */}
            {/* Наприклад: {isRecipeFavorite ? <FilledFavoriteIcon /> : <FavoriteIcon />} */}
            ❤️
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
