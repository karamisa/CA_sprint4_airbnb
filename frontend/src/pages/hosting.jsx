import { Outlet } from 'react-router-dom';
import { HostMenu } from '../cmps/hosting/host-menu';

export function Hosting() {
  return (
    <div className='main-layout'>
      <HostMenu />
      <div className='nested-route'>
        <Outlet />
      </div>
    </div>
  );
}
