import { useLocation } from 'react-router-dom';
import s from './Footer.module.css';
import footerLogo from './header-logo.svg';

export default function Footer() {
  const location = useLocation();
  const hideAccountLinks =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <footer>
      <div className={s.container}>
        <div className={s.logo}>
          <img src={footerLogo} alt="Logo" />
          <p className={s.title}>Tasteorama</p>
        </div>

        <p className={s.subtitle}>
          &copy; 2025 CookingCompanion. All rights reserved.
        </p>

        <nav className={s.navigation}>
          <a href="#" className={s.link}>
            Recipes
          </a>
          {!hideAccountLinks && (
            <a href="#" className={s.link}>
              Account
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
