import s from './BurgerModal.module.css';
import logo from '../../assets/icons//header-icons/header-logo.svg';
import logoutIcon from '../../assets/icons//header-icons/logout-icon.svg';
import close from '../../assets/icons/header-icons/burger-close.svg';

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
            <img src={close} alt="Burger" className={s.closeIcon} />
          </button>
        </div>

        <ul className={s.list}>
          <li>
            <a className={s.link}>Recipes</a>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <a className={s.link}>Log in</a>
              </li>
              <li>
                <a className={s.link + ' ' + s.registerBtn}>Register</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a className={s.link}>My Profile</a>
              </li>
              <li className={s.userSection}>
                <span className={s.avatar}>M</span>
                <span className={s.username}>Max</span>
                <button className={s.logout}>
                  <img src={logoutIcon} alt="Logout" />
                </button>
              </li>
              <li>
                <a className={s.link + ' ' + s.registerBtn}>Add Recepy</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
