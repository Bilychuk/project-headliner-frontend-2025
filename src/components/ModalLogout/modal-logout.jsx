import Modal from 'react-modal';
Modal.setAppElement('#root');
import css from './modal-logout.module.css';

import { useNavigate } from 'react-router-dom';

import sprite from '../../assets/icon/sprite.svg';
import { logout } from '../../redux/auth/operations';

import { useDispatch } from 'react-redux';

const LogoutModal = ({ isOpen, onRequestClose, onBurgerModalClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onConfirm = async () => {
    try {
      await dispatch(logout()).unwrap();
      onRequestClose();
      if (onBurgerModalClose) {
        onBurgerModalClose();
      }
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.container}
      overlayClassName={css.overlay}
    >
      <div>
        <button className={css.btnx}>
          <svg>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
        <h2 className={css.h2}>Are you sure?</h2>
        <p className={css.p}>We will miss you!</p>
        <div className={css.btncontainer}>
          <button className={css.btncancel} onClick={onRequestClose}>
            Cancel
          </button>
          <button className={css.btnlogout} onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
