import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';

const MainPage       = lazy(() => import('./pages/MainPage/MainPage'));
const RecipeViewPage = lazy(() => import('./pages/RecipeViewPage/RecipeViewPage'));
const AddRecipePage  = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));
const ProfilePage    = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const AuthPage       = lazy(() => import('./pages/AuthPage/AuthPage'));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes/:id" element={<RecipeViewPage />} />

        <Route
          path="/auth/:authType"
          element={
            <RestrictedRoute
              component={<AuthPage />}
              redirectTo="/"
            />
          }
        />

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
          element={<Navigate to="/profile/own" replace />}
        />
        <Route
          path="/profile/:recipeType"
          element={
            <PrivateRoute
              component={<ProfilePage />}
              redirectTo="/auth/login"
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}