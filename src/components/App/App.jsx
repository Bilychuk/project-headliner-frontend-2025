import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/AuthPage/LoginPage.jsx';
import RegisterPage from '../../pages/AuthPage/RegisterPage.jsx';
import Layout from '../Layout/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
}
