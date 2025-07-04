import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => (
  <div className={styles.wrapper}>
    <button onClick={onClick} className={styles.button}>
      Load More
    </button>
  </div>
);

export default LoadMoreBtn;
