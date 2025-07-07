import { Outlet } from 'react-router-dom';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation.jsx';

export default function ProfilePage() {
  return (
    <>
      <h1>Profile Page</h1>
      <ProfileNavigation />
      <Outlet />
    </>
  );
}
