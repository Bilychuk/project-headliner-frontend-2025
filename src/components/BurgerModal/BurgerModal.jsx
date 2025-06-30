import { NavLink } from 'react-router-dom';
import s from './BurgerModal.module.css';
import logo from '../../assets/icons/header-icons/header-logo.svg';
import close from '../../assets/icons/header-icons/burger-close.svg';
import UserInfo from '../UserInfo/UserInfo';
import LogoutBtn from '../LogoutBtn/LogoutBtn';

export default function BurgerModal({ onClose, isLoggedIn }) {
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <div className={s.logo}>
            <img src={logo} width={32} height={30} alt="Logo" />
            <p className={s.title}>Tasteorama</p>
          </div>
          <button className={s.closeBtn} onClick={onClose}>
            <img src={close} alt="Close" className={s.closeIcon} />
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
  );
}
