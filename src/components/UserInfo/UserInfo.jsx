import s from './UserInfo.module.css';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.js';

export default function UserInfo() {
  const user = useSelector(selectAuthUser);
  const name = user?.name || 'Guest';
  const avatarLetter = name[0]?.toUpperCase() || '?';

  return (
    <div className={s.container}>
      <span className={s.avatar}>{avatarLetter}</span>
      <span className={s.username}>{name}</span>
    </div>
  );
}
