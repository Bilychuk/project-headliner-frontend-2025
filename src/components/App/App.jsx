import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import MainPage from '../../pages/MainPage/MainPage';
import RecipeViewPage from '../../pages/RecipeViewPage/RecipeViewPage';
import AddRecipePage from '../../pages/AddRecipePage/AddRecipePage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="recipes/:id" element={<RecipeViewPage />} />
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="add-recipe" element={<AddRecipePage />} />
        <Route path="profile/:recipeType" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
