import s from './NotFound.module.css';

const NotFound = () => (
  <div className={s.notFound}>
    <h2>Recipe not found!</h2>
    <p>Unfortunately, this recipe doesn't exist.</p>
  </div>
);

export default NotFound;