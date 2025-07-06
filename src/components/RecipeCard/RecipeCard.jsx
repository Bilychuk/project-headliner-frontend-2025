import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import sprite from '../../assets/icon/sprite.svg';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleLoadMore = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  const handleSave = () => {
    navigate('/login');
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
          className={styles.image}
        />
      )}

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{recipe.title}</h3>
            <div className={styles.timeBox}>
            <svg className={styles.timeIcon} width="25" height="24">
              <use href="/src/assets/icon/sprite.svg#icon-clock" />
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
          <button className={styles.saveBtn} onClick={handleSave} aria-label="Save recipe">
            ❤️
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
