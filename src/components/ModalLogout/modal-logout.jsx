import Modal from 'react-modal';
Modal.setAppElement('#root');
import css from './LogoutModal.module.css';

import { useDispatch, useState } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import sprite from '../../assets/icon/sprite.svg';
import { logout } from '../../redux/auth/operations';

const LogoutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onConfirm = async () => {
    await dispatch(logout());
    closeModal();
    navigate('/');
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className={css.container}
      overlayClassName={css.overlay}
    >
      <div>
        <button className={css.btnx} onClick={closeModal}>
          <svg>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
        <h2 className={css.h2}>Are you sure?</h2>
        <p className={css.p}>We will miss you!</p>
        <div className={css.btncontainer}>
          <button className={css.btncancel} onClick={closeModal}>
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
