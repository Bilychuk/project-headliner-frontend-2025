import Modal from 'react-modal';
import Filters from '../Filters/Filters.jsx';
Modal.setAppElement('#root');
import s from './FiltersModal.module.css';
import sprite from '../../assets/icon/sprite.svg';

const FiltersModal = ({
  isOpen,
  onClose,
  currentFilters,
  onApplyFilters,
  onResetAndCloseFilters,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modalContent}
      overlayClassName={s.overlay}
      ariaHideApp={false}
    >
      <div className={s.modalHeader}>
        <button className={s.filtersCloseBtn} onClick={onClose}>
          {' '}
          <span className={s.filtersText}>Filters</span>
          <svg className={s.closeIcon}>
            <use href={`${sprite}#icon-close-filters`} />
          </svg>
        </button>
      </div>

      <Filters
        onApplyFilters={onApplyFilters}
        currentFilters={currentFilters}
        onResetAndCloseFilters={onResetAndCloseFilters}
        isMobileModal={true}
      />
    </Modal>
  );
};

export default FiltersModal;
