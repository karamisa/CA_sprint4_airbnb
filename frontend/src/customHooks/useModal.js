import { useState } from 'react'
import { CloseBtn } from '../cmps/ui/buttons/close-btn'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [component, setComponent] = useState(null)

  function openModal(componentToOpen) {
    console.log('isOpen:', isOpen)
    setIsOpen(true)
    setComponent(componentToOpen)
  }

  function closeModal() {
    setIsOpen(false)
    setComponent(null)
  }

  const Modal = ({ isOpen, component: Component, closeModal }) => {
    if (!isOpen || !Component) return null
    return (
      <div className='modal'>
        <div className='close-modal-btn-container'>
          <CloseBtn onClick={closeModal} />
        </div>
        <div className='content-container'>
          {component}
        </div>
      </div>
    )
  }

  return {
    isOpen,
    component,
    openModal,
    closeModal,
    Modal: (props) => (
      <Modal isOpen={isOpen} component={component} closeModal={closeModal} {...props} />
    )
  }
}


// You can then use this hook in your component like so:
/* 
import useModal from './useModal'

function MyComponent() {
  const { isOpen, component, openModal, closeModal } = useModal()

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
  )
}


 */
