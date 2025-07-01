import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute';
import RestrictedRoute from '../RestrictedRoute';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../redux/auth/operations';

const MainPage = lazy(() => import('../../pages/MainPage/MainPage.jsx'));
const RecipeViewPage = lazy(() =>
  import('../../pages/RecipeViewPage/RecipeViewPage.jsx')
);
const AddRecipePage = lazy(() =>
  import('../../pages/AddRecipePage/AddRecipePage.jsx')
);
const ProfilePage = lazy(() =>
  import('../../pages/ProfilePage/ProfilePage.jsx')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.jsx'));
const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage/RegisterPage.jsx')
);
const OwnRecipes = lazy(() => import('../OwnRecipes/OwnRecipes.jsx'));
const FavoriteRecipes = lazy(() =>
  import('../FavoriteRecipes/FavoriteRecipes.jsx')
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense
        fallback={
          <p>
            <b>Loading...</b>
          </p>
        }
      >
        {/* Публічні маршрути */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipes/:id" element={<RecipeViewPage />} />

          {/* Auth для  юзера */}
          <Route
            path="/login"
            element={
              <RestrictedRoute component={<LoginPage />} redirectTo="/" />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
            }
          />

          {/* Приватні маршрути */}
          <Route
            path="/add-recipe"
            element={
              <PrivateRoute component={<AddRecipePage />} redirectTo="/login" />
            }
          />
          <Route
            path="/profile/:recipeType"
            element={
              <PrivateRoute component={<ProfilePage />} redirectTo="/login" />
            }
          >
            {/* Вкладені маршрути */}
            <Route path="own" element={<OwnRecipes />} />
            <Route path="favorites" element={<FavoriteRecipes />} />
          </Route>

          {/*маршрут-за-замовчуванням*/}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
