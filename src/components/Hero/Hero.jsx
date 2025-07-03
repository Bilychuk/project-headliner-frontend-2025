import css from './Hero.module.css';
import { SearchForm } from '../SearchForm/SearchForm';

export const Hero = () => {
  return (
    <section className={css.container}>
      <div className={css.hero}>
        <h1 className={css.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
        <SearchForm />
      </div>
    </section>
  );
};