import { Logo } from './logo';
import { SearchBar } from './search-bar';

export function AppHeader() {
  return (
    <header className='app-header-container main-layout'>
      <div className='app-header'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        <div className='header-search-bar-container'>
          <SearchBar />
        </div>
        <div className='header-user-container'>
          <button className='btn-rounded'>User</button>
        </div>
      </div>
    </header>
  );
}
