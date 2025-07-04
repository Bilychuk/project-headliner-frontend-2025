import Modal from 'react-modal';
Modal.setAppElement('#root');
import s from './ModalLogout.module.css';

import { useNavigate } from 'react-router-dom';

import sprite from '../../assets/icon/sprite.svg';
import { logout } from '../../redux/auth/operations';

import { useDispatch } from 'react-redux';

const ModalLogout = ({ isOpen, onRequestClose, onBurgerModalClose }) => {
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
      className={s.container}
      overlayClassName={s.overlay}
    >
      <div>
        <button className={s.btnx} onClick={onRequestClose}>
          <svg width="24" height="24">
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
        <h2 className={s.h2}>Are you sure?</h2>
        <p className={s.p}>We will miss you!</p>
        <div className={s.btncontainer}>
          <button className={s.btncancel} onClick={onRequestClose}>
            Cancel
          </button>
          <button className={s.btnlogout} onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogout;
