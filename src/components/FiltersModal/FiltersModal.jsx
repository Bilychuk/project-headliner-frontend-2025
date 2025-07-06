import Modal from 'react-modal';
import Filters from '../Filters/Filters.jsx';
Modal.setAppElement('#root');
import s from './FiltersModal.module.css';

const FiltersModal = ({
  isOpen,
  onRequestClose,
  currentFilters,
  onApplyFilters,
  onResetAndClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose} // Забезпечує закриття по Escape та кліку поза модалкою
      className={s.modalContent} // Клас для вмісту модалки
      overlayClassName={s.overlay} // Клас для фонового затемнення
    >
      <div className={s.modalHeader}>
        <h2 className={s.modalTitle}>Filters</h2> {/* Заголовок "Filters" */}
        <button className={s.closeButton} onClick={onRequestClose}>
          &times; {/* Символ хрестика */}
        </button>
      </div>

      {/* Рендеримо наш компонент Filters всередині модалки */}
      <Filters
        onApplyFilters={onApplyFilters}
        currentFilters={currentFilters}
        onResetAndClose={onResetAndClose}
      />
    </Modal>
  );
};

export default FiltersModal;
