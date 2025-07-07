import { useState } from 'react';
import styles from './SearchForm.module.css';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSubmit(trimmedQuery);
    }

    setQuery('');
  };

  return (
    <form className={styles.searchWrapper} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes"
        className={styles.searchInput}
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};
