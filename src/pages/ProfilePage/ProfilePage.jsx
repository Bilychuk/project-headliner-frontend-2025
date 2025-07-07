import { Outlet } from 'react-router-dom';
import s from './ProfilePage.module.css';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation.jsx';

export default function ProfilePage({ isLoggedIn }) {
  return (
    <div className={s.container}>
      <h2 className={s.title}>My profile</h2>
      <ProfileNavigation />
      <Outlet />
    </div>
  );
}
