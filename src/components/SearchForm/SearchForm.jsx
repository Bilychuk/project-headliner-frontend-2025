import css from './SearchForm.module.css';import styles from './SearchForm.module.css';

export const SearchForm = () => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Search recipes"
        className={styles.searchInput}
      />
      <button className={styles.searchButton}>Search</button>
    </div>
  );
};

export default SearchForm;