import css from './Hero.module.css';
import { SearchForm } from '../SearchForm/SearchForm';
import banner1x from '../../assets/img/Banner.webp';
import banner2x from '../../assets/img/Banner@2x.webp';

const Hero = ({ onSearch }) => {
  return (
    <section className={css.container}>
      <img
        src={banner1x}
        srcSet={`${banner2x} 2x`}
        alt="Hero banner"
        className={css.backgroundImage}
        decoding="async"
        fetchPriority="high"
      />
      <div className={css.overlay} />
      <div className={css.hero}>
        <h1 className={css.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
        <SearchForm onSubmit={onSearch} />
      </div>
    </section>
  );
};

export default Hero;
