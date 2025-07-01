import { NavLink } from 'react-router-dom';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import s from './Navigation.module.css';
import UserInfo from '../UserInfo/UserInfo';

export default function Navigation({ isLoggedIn }) {
  return (
    <nav className={s.desktopMenu}>
      <NavLink
        to="/"
        className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
      >
        Recipes
      </NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.active : ''}`
            }
          >
            Log in
          </NavLink>
          <NavLink to="/auth/register" className={s.registerBtn}>
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/profile/own"
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.active : ''}`
            }
          >
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
