import { NavLink } from 'react-router-dom';
import s from './ProfileNavigation.module.css';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import RecipeList from '../RecipeList/RecipeList.jsx';

export default function ProfileNavigation() {
  return (
    <div className={s.container}>
      <NavLink
        className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
        to="own"
      >
        My Recipes
      </NavLink>
      <NavLink
        className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
        to="favorites"
      >
        Saved Recipes
      </NavLink>
      <RecipeList recipes={recipes} type={recipeType} />
      <LoadMoreBtn />
    </div>
  );
}
