import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes, type }) => {
  if (!recipes || recipes.length === 0) {
    return null;
  }
  return (
    <div className={styles.container}>
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} type={type} />
      ))}
    </div>
  );
};

export default RecipeList;
