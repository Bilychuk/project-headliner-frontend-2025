import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import s from './Layout.module.css';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';

export default function Layout() {
  return (
    <>
      <AppBar />

      <main className={s.layout}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
