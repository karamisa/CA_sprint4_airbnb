import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import guest from '../assets/img/guest.svg';
import useClickOutside from '../customHooks/useClickOutside';
import { useModal } from '../customHooks/useModal';
import { LoginSignup } from './login-signup';
import { NavHamburger } from './ui/nav-hamburger';

export function NavMenu({ user, onLogout, onAddStay }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { closeModal, openModal, Modal } = useModal();
  const elNav= useRef();

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  useClickOutside(elNav, () => {
    if (navbarOpen) setNavbarOpen(false)
  })

  return (
    <>
      <Modal />
      <nav className='nav-menu' onClick={handleToggle} ref={elNav}>
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
              <Link onClick={() => openModal(<LoginSignup closeModal={closeModal} />)}>Log in</Link>
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
