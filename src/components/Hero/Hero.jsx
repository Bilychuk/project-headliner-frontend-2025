import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Hero.module.css';
import { SearchForm } from '../SearchForm/SearchForm';
import banner1x from '../../assets/img/Banner.webp';
import banner2x from '../../assets/img/Banner@2x.webp';

const Hero = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={css.container}>
      <img
        src={banner1x}
        srcSet={`${banner2x} 2x`}
        alt=""
        className={css.backgroundImage}
        loading="lazy"
      />

      <div
        className={`${css.overlay} ${isLoggedIn ? css.hideOverlay : ''}`}
      />

      <div className={css.hero}>
        <h1 className={css.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
        <SearchForm />
      </div>
    </section>
  );
};

export default Hero;