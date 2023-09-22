import { useEffect } from 'react';
import { Backdrop, ModalItem } from './Modal.styled';

export default function Modal({ onClose, image, tags }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Backdrop onClick={handleBackdrop}>
      <ModalItem>
        <img src={image} alt={tags} />
      </ModalItem>
    </Backdrop>
  );
}
