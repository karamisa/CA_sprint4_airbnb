import { Inbox } from '../cmps/chat/inbox'
import { Logo } from '../cmps/logo'
import { NavMenu } from '../cmps/nav-menu'

export function ChatApp() {
  return (
    <section>
      <header className='app-header main-layout flex justify-between'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      <Inbox />
    </section>
  )
}
