import { NavLink } from 'react-router-dom';
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
            <div className={s.logo}>
              <svg className={s.logoImg}>
                <use href={`${sprite}#icon-logo`} />
              </svg>
              <p className={s.title}>Tasteorama</p>
            </div>
            <button className={s.closeBtn} onClick={onClose}>
              <svg className={s.close}>
                <use href={`${sprite}#icon-close-with-circle`} />
              </svg>
            </button>
          </div>

          <ul className={s.list}>
            <li>
              <NavLink to="/recipes" className={s.link}>
                Recipes
              </NavLink>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/login" className={s.link}>
                    Log in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={`${s.link} ${s.registerBtn}`}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/profile" className={s.link}>
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
