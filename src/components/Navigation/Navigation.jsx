import { NavLink } from 'react-router-dom';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import s from './Navigation.module.css';
import UserInfo from '../UserInfo/UserInfo';

export default function Navigation({ isLoggedIn }) {
  return (
    <nav className={s.desktopMenu}>
      <NavLink to="/" className={s.link}>
        Recipes
      </NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink to="/login" className={s.link}>
            Log in
          </NavLink>
          <NavLink to="/register" className={s.registerBtn}>
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/profile/:recipeType" className={s.link}>
            My Profile
          </NavLink>
          <NavLink to="/add-recipe" className={s.registerBtn}>
            Add Recipe
          </NavLink>
          <div className={s.userSection}>
            <UserInfo />
            <LogoutBtn />
          </div>
        </>
      )}
    </nav>
  );
}
