import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import sprite from '../../assets/icon/sprite.svg';
import s from './AppBar.module.css';
import BurgerModal from '../BurgerModal/BurgerModal';
import Navigation from '../Navigation/Navigation';

export default function AppBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <svg className={s.logo}>
          <use href={`${sprite}#icon-logo`} />
        </svg>
        <span className={s.title}>Tasteorama</span>
        <Navigation isLoggedIn={isLoggedIn} />
        <button className={s.burgerBtn} onClick={toggleModal}>
          <svg className={s.burger}>
            <use href={`${sprite}#icon-burger`} />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <BurgerModal onClose={toggleModal} isLoggedIn={isLoggedIn} />
      )}
    </header>
  );
}
