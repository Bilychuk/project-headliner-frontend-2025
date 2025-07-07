import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes, type }) => {
  return (
    <div className={styles.container}>
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} type={type} />
      ))}
    </div>
  );
};

export default RecipeList;
