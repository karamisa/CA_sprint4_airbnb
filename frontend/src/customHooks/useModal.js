import { useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState(null);

  function openModal(componentToOpen) {
    console.log('isOpen:', isOpen);
    setIsOpen(true);
    setComponent(componentToOpen);
  }

  function closeModal() {
    setIsOpen(false);
    setComponent(null);
  }

  return {
    isOpen,
    component,
    openModal,
    closeModal,
  };
}

// You can then use this hook in your component like so:
/* 
import useModal from './useModal';

function MyComponent() {
  const { isOpen, component, openModal, closeModal } = useModal();

  return (
    <div>
      <button onClick={() => openModal(<MyModalComponent />)}>Open Modal</button>
      {isOpen && (
        <div>
          {component}
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}
    </div>
  );
}


 */
