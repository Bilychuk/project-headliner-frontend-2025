import React from 'react';
import css from './Hero.module.css';
import bannerImage from '../../assets/img/Desktop/Banner.webp';

export const Hero = () => {
  
  return (
  <section 
      className={css.container}
    >
    <div className={css.hero}>
        <h1 className={css.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
        <div className={css.searchWrapper}>
          <input 
            type="text" 
            placeholder="Search recipes" 
            className={css.searchInput}
          />
          <button className={css.searchButton}>Search</button>
        </div>
    </div>
  </section>
  );
};