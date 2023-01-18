import { Logo } from './logo';

export function AppHeader() {
  return (
    <header className='app-header main-layout'>
      <div className='header-logo'>
        <Logo />
      </div>
      <div className='header-filter'>middle</div>
      <div className='header-user'>
        <button className='btn-rounded'>User</button>
      </div>
    </header>
  );
}
