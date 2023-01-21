import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay.service.local';
import { login, logout, signup, updateUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup';
import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { SearchBars as StaySearchBars } from './search-bars';
import { saveStay } from '../store/stay/stay.action';

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.user)
  const navigate = useNavigate()
  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }
  
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
    newStay.name=prompt('Enter stay name')
    newStay.host._id=user._id
    newStay.host.fullname=user.fullname
    newStay.host.imgUrl=user.imgUrl
    if (!user.isOwner) {
      user.isOwner = true
      updateUser(user)
    }
    saveStay(newStay)
  }

  return (
    <header className='app-header-container main-layout'>
      <div className='app-header'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        <div className='header-search-bar-container'>
          <StaySearchBars />
        </div>
        <div className='header-menu-container'>
          {user && <NavMenu user={user} onLogout={onLogout} onAddStay={onAddStay}/>}
          {!user && <LoginSignup onSignup={onSignup} onLogin={onLogin} />}
        </div>
      </div>
    </header>
  )
}
