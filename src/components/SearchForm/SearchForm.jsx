import { useState } from 'react';
import styles from './SearchForm.module.css';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  const handleChange = e => {
    setQuery(e.target.value);
    if (error) setError(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSubmit(trimmedQuery);
      setQuery('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <form className={styles.searchWrapper} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Search recipes"
          className={`${styles.searchInput} ${error ? styles.errorBorder : ''}`}
          value={query}
          onChange={handleChange}
        />
        {error && (
          <div className={styles.errorText}>Please enter search query</div>
        )}
      </div>
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};
