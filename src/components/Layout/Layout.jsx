import { Outlet } from 'react-router-dom';
import s from './Layout.module.css';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';
import { Suspense } from 'react';

export default function Layout() {
  return (
    <>
      <AppBar />
      
      <main className={s.layout}>
        {/* <Outlet /> */}
        <Suspense
          fallback={
            <p>
              <b>Loading...</b>
            </p>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
