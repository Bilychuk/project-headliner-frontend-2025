import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}
