import s from './LogoutBtn.module.css';
import sprite from '../../assets/icon/sprite.svg';
import { useState } from 'react';
import ModalLogout from '../ModalLogout/ModalLogout.jsx';

export default function LogoutBtn({ onBurgerModalClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={s.logout} onClick={handleOpenModal}>
        <svg className={s.logoutBtn}>
          <use href={`${sprite}#icon-logout`} />
        </svg>
      </button>
      <ModalLogout
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onBurgerModalClose={onBurgerModalClose}
      />
    </>
  );
}
