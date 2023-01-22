import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilterBar } from '../cmps/category-filter-bar';
import { AppFooter } from '../cmps/header-footer/app-footer';
import { AppHeader } from '../cmps/header-footer/app-header';
import { StayList } from '../cmps/stay-list/stay-list';
import { loadStays } from '../store/stay/stay.action';

export function StayIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stays = useSelector((storeState) => storeState.stayModule.stays);

  //TODO: add more filters for params 
  const filterBy = { 
    category: searchParams.get('category'),
    location: searchParams.get('location') };


  useEffect(() => {
    loadStays(filterBy);
  }, [searchParams]);

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  if (!stays && (!stays.length))
    return <section className='stay-list-container card-grid'>loading</section>;
  return (
    <section style={{ position: 'relative' }}>
      <AppHeader className='main-layout' />
      <CategoryFilterBar
        handleChange={handleChange}
        currCategory={filterBy.category}
      />
      {<StayList stays={stays} />}
      {stays && !stays.length && <h1 style={{textAlign: 'center', marginTop: '20px'}}>No stays found</h1>}
      <AppFooter className='main-layout fixed' />
    </section>
  );
}
