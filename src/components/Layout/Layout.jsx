import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import s from './Layout.module.css';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader.jsx';

const ToastContainer = lazy(() =>
  import('react-toastify').then(mod => ({ default: mod.ToastContainer }))
);

export default function Layout() {
  return (
    <div className={s.wrapper}>
      <AppBar />

      <main className={s.layout}>
        {/* <Outlet /> */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <Suspense fallback={null}>
        <ToastContainer position="top-right" />
      </Suspense>
    </div>
  );
}
