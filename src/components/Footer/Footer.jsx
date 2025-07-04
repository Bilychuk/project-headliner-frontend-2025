import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import s from './Footer.module.css';
import sprite from '../../assets/icon/sprite.svg';

export default function Footer() {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const hideAccountLinks =
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/register';

  return (
    <footer>
      <div className={s.container}>
        <Link to="/" className={s.logo}>
          <svg className={s.logoIcon}>
            <use href={`${sprite}#icon-logo`} />
          </svg>
          <p className={s.title}>Tasteorama</p>
        </Link>

        <p className={s.subtitle}>
          &copy; 2025 CookingCompanion. All rights reserved.
        </p>

        <nav className={s.navigation}>
          <NavLink to="/recipes" className={s.link}>
            Recipes
          </NavLink>

          {!hideAccountLinks && (
            <NavLink
              to={isLoggedIn ? '/profile/own' : '/auth/login'}
              className={s.link}
            >
              Account
            </NavLink>
          )}
        </nav>
      </div>
    </footer>
  );
}
