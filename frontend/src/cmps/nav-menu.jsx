import { useState } from 'react';
import { Link } from 'react-router-dom';
import guest from '../assets/img/guest.svg';
import { useModal } from '../customHooks/useModal';
import { LoginSignup } from './login-signup';

export function NavMenu({ user, onLogout, onAddStay }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { isOpen, component, openModal, closeModal } = useModal();

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
    if (navbarOpen) {
    }
  };

  return (
    <>
      <div>
        {isOpen && (
          <div className='modal'>
            {component}
            <button onClick={closeModal}>Close Modal</button>
          </div>
        )}
      </div>

      <nav className='nav-menu' onClick={handleToggle}>
        <div className='menu-btn'>
          <div className='menu-hamburger'>
            <svg
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              role='presentation'
              focusable='false'>
              <g fill='none' fillRule='nonzero'>
                <path d='m2 16h28'></path>
                <path d='m2 24h28'></path>
                <path d='m2 8h28'></path>
              </g>
            </svg>
          </div>
          <div className='menu-avatar'>
            {user?.imgUrl ? (
              <img src={user.imgUrl} alt={user.fullname} />
            ) : (
              <img src={guest} alt='' />
            )}
          </div>
        </div>
        {navbarOpen &&
          (!user ? (
            <div className='menu-links'>
              <Link onClick={() => openModal(<LoginSignup />)}>Log in</Link>
            </div>
          ) : (
            <div className='menu-links'>
              <Link to='/trip'>Trips</Link>
              <Link to='/stay'>Messages (coming soon)</Link>
              {user.isOwner && (
                <Link to='/hosting/order'>View Orders (host)</Link>
              )}
              <button onClick={onAddStay}>
                {user.isOwner ? 'Add Another Stay' : 'Become a host (Add stay)'}
              </button>
              <button onClick={onLogout}>Log out</button>
            </div>
          ))}
      </nav>
    </>
  );
}
