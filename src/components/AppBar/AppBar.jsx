import { useState } from 'react';
import s from './AppBar.module.css';
import logo from '../../assets/icons/header-icons/header-logo.svg';
import burger from '../../assets/icons/header-icons/burger-icon.svg';
import BurgerModal from '../BurgerModal/BurgerModal';
import Navigation from '../Navigation/Navigation';

export default function AppBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = true;

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <header className={s.header}>
      <div className={`${s.container} ${isModalOpen ? s.hidden : ''}`}>
        <img src={logo} width={32} height={30} alt="Logo" />
        <span className={s.title}>Tasteorama</span>
        <Navigation isLoggedIn={isLoggedIn} />
        <button className={s.burgerBtn} onClick={toggleModal}>
          <img src={burger} alt="Burger" className={s.burger} />
        </button>
      </div>

      {isModalOpen && (
        <BurgerModal onClose={toggleModal} isLoggedIn={isLoggedIn} />
      )}
    </header>
  );
}
