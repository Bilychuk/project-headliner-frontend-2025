import { NavLink } from 'react-router-dom';

export default function ProfileNavigation() {
  return (
    <>
      <NavLink to="own">My Recipes</NavLink>
      <NavLink to="favorites">Saved Recipes</NavLink>
    </>
  );
}
