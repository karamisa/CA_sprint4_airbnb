import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { SearchBar } from './search-bar';
import { SearchForm } from './search-form';

export function AppHeader() {
  return (
    <header className='app-header-container main-layout'>
      <div className='app-header'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        <div className='header-search-bar-container'>
          <SearchBar />
          {/* <SearchForm /> */}
        </div>
        <div className='header-menu-container'>
         <NavMenu />
        </div>
      </div>
    </header>
  );
}
