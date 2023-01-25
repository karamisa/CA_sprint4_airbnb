import { Logo } from '../logo'
import { NavMenu } from '../nav-menu'
import { SearchBars as StaySearchBars } from '../search-cmps/search-bars'

export function AppHeader({ className, ...props }) {
  return (
    <header {...props} className={`app-header ${className}`}>
      <div className='header-logo-container'>
        <Logo />
      </div>
      <div className='header-search-bar-container'>
        <StaySearchBars />
      </div>
      <div className='header-menu-container'>
        <NavMenu />
      </div>
    </header>
  )
}
