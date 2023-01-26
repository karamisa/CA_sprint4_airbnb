
import { NavMenu } from '../nav-menu'

export function AppFooter({ className, ...props }) {





  return (
    <footer {...props} className={`app-footer flex justify-between ${className}`}>
      <p>ake-bnb &copy; 2023</p>
      <div className='header-menu-container'>
        <NavMenu />
      </div>
    </footer>
  )
}
