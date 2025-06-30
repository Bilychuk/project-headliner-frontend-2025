import Modal from 'react-modal';
Modal.setAppElement('#root');
import css from './LogoutModal.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeLogoutModal } from '../../redux/auth/slice.js';
import { logout } from '../../redux/auth/operations.js';

const LogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = useSelector(state => state.modal.isLogoutModalOpen);

  const onClose = () => {
    dispatch(closeLogoutModal());
  };

  const onConfirm = async () => {
    await dispatch(logout());
    dispatch(closeLogoutModal());
    navigate('/');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.container}
      overlayClassName={css.overlay}
    >
      <div>
        <button type="button" className={css.btnx} onClick={onClose}>
          <svg>
            <use href="../../assets/icons/header-icons/burger-close.svg"></use>
          </svg>
        </button>
        <h2 className={css.h2}>Are you sure?</h2>
        <p className={css.p}>We will miss you!</p>
        <div className={css.btncontainer}>
          <button type="button" className={css.btncancel} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={css.btnlogout} onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
