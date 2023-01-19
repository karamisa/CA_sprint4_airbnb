import { useState } from 'react';
import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { SearchBar } from './search-bar';
import { SearchForm as StaySearchForm } from './search-form';

export function AppHeader() {
  const [searchFormOpen, setSearchFormOpen] = useState(false)

  const handleToggle = () => {
      setSearchFormOpen(prev => !prev)
      console.log('click')

  }

  
  return (
    <header className='app-header-container main-layout'>
      <div className='app-header'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        {!searchFormOpen && <div className='header-search-bar-container flex column align-center' onClick={handleToggle}>
           <SearchBar />
           </div>}
          {searchFormOpen && <div className='header-search-bar-container flex'>
           <StaySearchForm/>
           <button onClick={handleToggle}>toggleForm</button>
           </div>}
 
        <div className='header-menu-container'>
         <NavMenu />
        </div>
      </div>
    </header>
  );
}
