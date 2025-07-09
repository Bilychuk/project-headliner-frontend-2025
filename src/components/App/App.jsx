import { lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import Layout from '../Layout/Layout';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute.jsx';
import { useDispatch } from 'react-redux';
import { autoLogin } from '../../redux/auth/operations';

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
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    // {/* Публічні маршрути */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/recipes/:id" element={<RecipeViewPage />} />

        {/* Auth для  юзера */}
        <Route
          path="/auth/login"
          element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />}
        />
        <Route
          path="/auth/register"
          element={
            <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
          }
        />

        {/* Приватні маршрути */}
        <Route
          path="/add-recipe"
          element={
            <PrivateRoute
              component={<AddRecipePage />}
              redirectTo="/auth/login"
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              component={<ProfilePage />}
              redirectTo="/auth/login"
            />
          }
        >
          {/* Вкладені маршрути */}
          <Route index element={<Navigate to="own" />} />
          <Route path="own" element={<OwnRecipes />} />
          <Route path="favorites" element={<FavoriteRecipes />} />
        </Route>

        {/*маршрут-за-замовчуванням*/}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
