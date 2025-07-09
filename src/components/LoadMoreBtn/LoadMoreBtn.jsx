import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, isLoading }) => (
  <div className={styles.wrapper}>
    <button 
    onClick={onClick} 
    className={`${styles.button} ${styles.hidden}`}
    disabled={isLoading} >
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  </div>
);

export default LoadMoreBtn;
