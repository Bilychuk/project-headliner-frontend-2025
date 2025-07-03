import css from './Loader.module.css';
import { PulseLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className={css.loader}>
      <PulseLoader
        color="#3D2218"
        loading={true}
        size={20}
        aria-label="loading-spinner"
      />
    </div>
  );
}
