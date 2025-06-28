import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import MainPage from '../../pages/MainPage/MainPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
}
