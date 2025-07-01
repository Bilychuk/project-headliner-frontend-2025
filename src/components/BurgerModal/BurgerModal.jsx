import { Link, NavLink } from 'react-router-dom';
import sprite from '../../assets/icon/sprite.svg';
import s from './BurgerModal.module.css';
import UserInfo from '../UserInfo/UserInfo';
import LogoutBtn from '../LogoutBtn/LogoutBtn';

export default function BurgerModal({ onClose, isLoggedIn }) {
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <div className={s.modalContent}>
          <div className={s.modalHeader}>
            <Link to="/" className={s.logo} onClick={onClose}>
              <svg className={s.logoImg}>
                <use href={`${sprite}#icon-logo`} />
              </svg>
              <p className={s.title}>Tasteorama</p>
            </Link>

            <button className={s.closeBtn} onClick={onClose}>
              <svg className={s.close}>
                <use href={`${sprite}#icon-close-with-circle`} />
              </svg>
            </button>
          </div>

          <ul className={s.list}>
            <li>
              <NavLink to="/" className={s.link} onClick={onClose}>
                Recipes
              </NavLink>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    className={s.link}
                    onClick={onClose}
                  >
                    Log in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/register"
                    className={`${s.link} ${s.registerBtn}`}
                    onClick={onClose}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/profile/own"
                    className={s.link}
                    onClick={onClose}
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className={s.userSection}>
                  <UserInfo />
                  <LogoutBtn />
                </li>
                <li>
                  <NavLink
                    to="/add-recipe"
                    className={`${s.link} ${s.registerBtn}`}
                    onClick={onClose}
                  >
                    Add Recipe
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
