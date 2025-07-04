import { useEffect, useState } from 'react';
import { getRecipes } from '../../api/api';
import RecipeList from '../../components/RecipeList/RecipeList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const LIMIT = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getRecipes(page, LIMIT);
        console.log('API response:', response);

       const newRecipes = Array.isArray(response.data?.data)
      ? response.data.data
      : [];

        setRecipes(prev => {
        const ids = new Set(prev.map(r => r.id));
        const uniqueNew = newRecipes.filter(r => !ids.has(r.id));
        return [...prev, ...uniqueNew];
      });

        if (newRecipes.length < LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleLoadMore = () => setPage(prev => prev + 1);

  return (
    <section className={styles.section}>
      <RecipeList recipes={recipes} />
      {loading && <p className={styles.loading}>Dowload...</p>}
      {hasMore && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
    </section>
  );
};

export default MainPage;
