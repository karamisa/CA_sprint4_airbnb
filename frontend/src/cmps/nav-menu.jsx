import { useState } from 'react';
import { Link } from 'react-router-dom';
import guest from '../assets/img/guest.svg';
import { useModal } from '../customHooks/useModal';
import { LoginSignup } from './login-signup';
import { NavHamburger } from './ui/nav-hamburger';

export function NavMenu({ user, onLogout, onAddStay }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { openModal, Modal } = useModal();

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
    if (navbarOpen) {
    }
  };

  return (
    <>
      <Modal />
      <nav className='nav-menu' onClick={handleToggle}>
        <div className='menu-btn'>
          <NavHamburger />
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
