import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import s from './ModalErrorSaving.module.css';
import sprite from '../../assets/icon/sprite.svg';
import { api } from '../../api/api.js';
import { useDispatch } from 'react-redux';

export default function ModalErrorSaving({ isOpen, onRequestClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    delete api.defaults.headers.common.Authorization;
    dispatch(logoutAction());
    onRequestClose();
    navigate('/auth/login');
  };

  const handleRegister = () => {
    onRequestClose();
    setTimeout(() => navigate('/auth/register'), 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <button className={s.closeBtn} onClick={onRequestClose}>
        <svg className={s.icon} stroke="#000">
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>

      <h2 className={s.title}>Error while saving</h2>
      <p className={s.subtitle}>
        To save this recipe, you need to authorize first
      </p>

      <div className={s.buttons}>
        <button className={s.logInBtn} type="button" onClick={handleLogin}>
          Log in
        </button>
        <button
          className={s.registerBrn}
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </Modal>
  );
}
