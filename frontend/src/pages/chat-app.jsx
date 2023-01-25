import { Inbox } from '../cmps/chat/inbox'
import { Logo } from '../cmps/logo'
import { NavMenu } from '../cmps/nav-menu'

export function ChatApp() {
  return (
    <section className='chat-app'>
      <header className='app-header main-layout flex'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      <Inbox />
    </section>
  )
}
