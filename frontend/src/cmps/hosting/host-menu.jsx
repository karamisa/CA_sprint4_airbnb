import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { stayService } from '../../services/stay.service'
import { saveStay } from '../../store/stay/stay.action'
import { logout, updateUser } from '../../store/user.actions'
import { Logo } from '../logo'
import { NavMenu } from '../nav-menu'

export function HostMenu() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

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
    const newStay = stayService.getEmptyStay()
    newStay.name = prompt('Enter stay name')
    newStay.host._id = user._id
    newStay.host.fullname = user.fullname
    newStay.host.imgUrl = user.imgUrl
    if (!user.isOwner) {
      user.isOwner = true
      updateUser(user)
    }
    saveStay(newStay)
  }
  return (
    <div className='secondary-layout app-header'>
      <div className='header-logo-container'>
        <Logo />
      </div>
      <div className='host-menu'>
        <NavLink className='menu-link' to='order'>
          Orders
        </NavLink>
        <NavLink className='menu-link' to='dashboard'>
          Dashboard
        </NavLink>
      </div>
      <div className='header-menu-container'>
        <NavMenu user={user} onLogout={onLogout} onAddStay={onAddStay} />
      </div>
    </div>
  )
}
