import Modal from 'react-modal';
Modal.setAppElement('#root');
import css from './LogoutModal.module.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.container}
      overlayClassName={css.overlay}
    >
      <div>
        <button className={css.btn - x} onClick={onClose}>
          <svg width="24" height="24">
            <use href="./close24px.svg"></use>
          </svg>
        </button>
        <h2 className={css.h2}>Are you shure?</h2>
        <p className={css.p}>We will miss you?</p>
        <div lassName={css.btn - container}>
          <button className={css.btn - logout} onClick={onConfirm}>
            Log out
          </button>
          <button className={css.btn - cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
