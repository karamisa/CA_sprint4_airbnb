import { NavLink } from 'react-router-dom';

export function HostMenu() {
  return (
    <div className='host-menu'>
      <NavLink className='menu-link' to='order'>
        Order
      </NavLink>
      <NavLink className='menu-link' to='dashboard'>
        Dashboard
      </NavLink>
    </div>
  );
}
