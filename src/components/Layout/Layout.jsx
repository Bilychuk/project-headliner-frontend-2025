import { Outlet } from 'react-router-dom';
import s from './Layout.module.css';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';
import { Suspense } from 'react';
import Loader from '../Loader/Loader.jsx';

export default function Layout() {
  return (
    <>
      <AppBar />
      
      <main className={s.layout}>
        {/* <Outlet /> */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
