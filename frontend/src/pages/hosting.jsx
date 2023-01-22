import { Outlet } from 'react-router-dom';
import { AppFooter } from '../cmps/header-footer/app-footer';
import { AppHeader } from '../cmps/header-footer/app-header';
import { HostMenu } from '../cmps/hosting/host-menu';

export function Hosting() {
  return (
    <section>
      <AppHeader className='main-layout' />
      <div className='main-layout'>
        <HostMenu />
        <div className='nested-route'>
          <Outlet />
        </div>
      </div>
      <AppFooter className='main-layout fixed' />
    </section>
  );
}
