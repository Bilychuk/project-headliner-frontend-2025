import { useEffect, useState } from 'react';
import { getRecipes } from '../../api/api';
import RecipeList from '../../components/RecipeList/RecipeList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/Loader/Loader.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import styles from './MainPage.module.css';
import { toast } from 'react-toastify';

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

        const newRecipes = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setRecipes(prev => {
        const ids = new Set(prev.map(r => r._id));
        const uniqueNew = newRecipes.filter(r => !ids.has(r._id));
        return [...prev, ...uniqueNew];
      });

        if (newRecipes.length < LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        const errorMessage = error || 'Error loading recipes';
        toast.error(errorMessage, { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);
console.log('fetching page:', page);
  const handleLoadMore = () => setPage(prev => prev + 1);

  return (
    <section className={styles.section}>
      <Hero />
      <RecipeList recipes={recipes} />
      {loading && <p className={styles.loading}>Download...</p>}
      {loading && <Loader />}
      {hasMore && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
    </section>
  );
};

export default MainPage;
