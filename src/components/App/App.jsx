import { Suspense } from 'react';
import { lazy } from 'react';
import { Route, Router, Routes } from 'react-router-dom';

const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const RecipeViewPage = lazy(() => import('../../pages/RecipeViewPage/RecipeViewPage'));
const AddRecipePage = lazy(() => import('../../pages/AddRecipePage/AddRecipePage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage/ProfilePage'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage'));

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default function App() {
  return (
    <Router>
      {/* Загальний лейаут з навігацією */}
      <Layout />

      <Suspense fallback={<p><b>Loading...</b></p>}>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/" element={<MainPage />} />
          <Route path="/recipes/:id" element={<RecipeViewPage />} />
          <Route path="/auth/:authType" element={<AuthPage />} />

          {/* Приватні маршрути */}
          <Route element={<PrivateRoute />}>
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/profile">
              {/* За замовчуванням редірект на власні рецепти */}
              <Route index element={<Navigate to="own" replace />} />
              <Route path=":recipeType" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Обробка невідомих маршрутів */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
