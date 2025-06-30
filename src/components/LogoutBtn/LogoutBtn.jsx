import logoutIcon from '../../assets/icons/header-icons/logout-icon.svg';
import s from './LogoutBtn.module.css';

export default function LogoutBtn() {
  return (
    <>
      <button className={s.logout}>
        <img src={logoutIcon} alt="Logout" />
      </button>
    </>
  );
}
