
import { NavMenu } from '../nav-menu'

export function AppFooter({ className, ...props }) {





  return (
    <footer {...props} className={`app-footer flex justify-between ${className}`}>
      <p>&copy; 2023 Akebnb<span className='footer-names'>, Andrey Solonikov, Karam Isa and Elichay Kaplan</span></p>
      <div className='header-menu-container'>
        <NavMenu />
      </div>
    </footer>
  )
}
