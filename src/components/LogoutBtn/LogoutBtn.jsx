import s from './LogoutBtn.module.css';
import sprite from '../../assets/icon/sprite.svg';

export default function LogoutBtn() {
  return (
    <>
      <button className={s.logout}>
        <svg className={s.logoutBtn}>
          <use href={`${sprite}#icon-logout`} />
        </svg>
      </button>
    </>
  );
}
