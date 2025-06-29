import { lazy, Suspense  } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute';
import RestrictedRoute from '../RestrictedRoute';

const MainPage       = lazy(() => import('../../pages/MainPage/MainPage'));
const RecipeViewPage = lazy(() => import('../../pages/RecipeViewPage/RecipeViewPage'));
const AddRecipePage  = lazy(() => import('../../pages/AddRecipePage/AddRecipePage'));
const ProfilePage    = lazy(() => import('../../pages/ProfilePage/ProfilePage'));
const LoginPage       = lazy(() => import('../../pages/AuthPage/LoginPage'));
const RegisterPage    = lazy(() => import('../../pages/AuthPage/RegisterPage'));
const OwnRecipes      = lazy(() => import('../OwnRecipes/OwnRecipes'));
const FavoriteRecipes = lazy(() => import('../FavoriteRecipes/FavoriteRecipes'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<p><b>Loading...</b></p>}></Suspense>
      {/* Публічні маршрути */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes/:id" element={<RecipeViewPage />} />
        
        {/* Auth для  юзера */}
        <Route
            path="/auth/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/"
              />
            }
          />
          <Route
            path="/auth/register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/"
              />
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
      <Route path="/profile/:recipeType" element={<ProfilePage />}>
        {/* Вкладені маршрути */}
        <Route path="own" element={<OwnRecipes />} />
        <Route path="favorites" element={<FavoriteRecipes />} />
      </Route>
        
        {/*маршрут-за-замовчуванням*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
