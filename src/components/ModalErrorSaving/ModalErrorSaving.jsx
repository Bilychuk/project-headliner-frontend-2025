import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import s from './ModalErrorSaving.module.css';
import sprite from '../../assets/icon/sprite.svg';

Modal.setAppElement('#root');

export default function ModalErrorSaving({ isOpen, onRequestClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onRequestClose();
    navigate('/auth/login');
  };

  const handleRegister = () => {
    onRequestClose();
    navigate('/auth/register');
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
        <button className={s.logInBtn} onClick={handleLogin}>
          Log in
        </button>
        <button className={s.registerBrn} onClick={handleRegister}>
          Register
        </button>
      </div>
    </Modal>
  );
}
