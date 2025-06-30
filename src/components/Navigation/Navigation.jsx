import { NavLink } from 'react-router-dom';
import logoutIcon from '../../assets/icons//header-icons/logout-icon.svg';
import s from './Navigation.module.css';

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
            Add Recepy
          </NavLink>
          <div className={s.userSection}>
            <span className={s.avatar}>M</span>
            <span className={s.username}>Max</span>
            <button className={s.logout}>
              <img src={logoutIcon} alt="Logout" />
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
