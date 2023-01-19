import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { SearchBar } from './search-bar';
import { SearchForm as StaySearchForm } from './search-form';

export function AppHeader() {
  const [searchFormOpen, setSearchFormOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const filterBy = {location: searchParams.get('location')}


  const handleToggle = () => {
    setSearchFormOpen(prev => !prev)
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
          <StaySearchForm filterBy={filterBy} />
          <button onClick={handleToggle}>close</button>
        </div>}

        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </div>
    </header>
  )
}
