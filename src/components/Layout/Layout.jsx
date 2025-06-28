import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import s from './Layout.module.css';

export default function Layout() {
  return (
    <div className={s.layout}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
