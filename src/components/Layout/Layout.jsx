import { Outlet } from 'react-router-dom';
import s from './Layout.module.css';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';

export default function Layout() {
  return (
    <>
      <AppBar />
      <main className={s.layout}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
