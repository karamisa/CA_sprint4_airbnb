import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import guest from '../assets/img/guest.svg'
import useClickOutside from '../customHooks/useClickOutside'
import { useModal } from '../customHooks/useModal'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay.service'
import { logout } from '../store/user.actions'
import { LoginSignup } from './login-signup'
import { NavHamburger } from './ui/nav-hamburger'

export function NavMenu() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const notifications = useSelector((storeState) => storeState.userModule.notifications)
  console.log(notifications)

  async function onLogout() {
    try {
      await logout()
      navigate('/stay')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function onAddStay() {
    navigate('/new-stay')
    // stayService.addDemoStay()
  }

  const [navbarOpen, setNavbarOpen] = useState(false)
  const { closeModal, openModal, Modal } = useModal()
  const elNav = useRef()

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev)
  }

  useClickOutside(elNav, () => {
    if (navbarOpen) setNavbarOpen(false)
  })

  return (
    <>
      <Modal />
      <nav className='nav-menu' onClick={handleToggle} ref={elNav}>
        {(notifications.length>0) && <div className='notificaiton-badge'>{notifications.length}</div>}
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
              <Link
                onClick={() =>
                  openModal(<LoginSignup closeModal={closeModal} />)
                }>
                Log in
              </Link>
            </div>
          ) : (
            <div className='menu-links'>
              <Link to='/trip'>Trips</Link>
              <Link to='/wishlist'>Wishlist</Link>
              <Link to='/user/inbox'>Messages (beta)</Link>
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
  )
}
