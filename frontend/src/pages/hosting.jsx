import { Outlet } from 'react-router-dom'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { HostMenu } from '../cmps/hosting/host-menu'

export function Hosting() {
  return (
    <section>
      <HostMenu />
      <Outlet />
      <AppFooter className='main-layout fixed' />
    </section>
  )
}
