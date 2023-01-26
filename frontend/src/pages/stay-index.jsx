import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { CategoryFilterBar } from '../cmps/category-filter-bar'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { AppHeader } from '../cmps/header-footer/app-header'
import { StayList } from '../cmps/stay-list/stay-list'
import { loadStays } from '../store/stay/stay.action'

export function StayIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  //TODO: add more filters for params
  const filterBy = {
    category: searchParams.get('category'),
    location: searchParams.get('location'),
    // TODO ? is this good to filter by dates?
    startDate: new Date().setDate(new Date().getDate() + 1),
    endDate: new Date().setDate(new Date().getDate() + 4),
  }

  useEffect(() => {
    loadStays(filterBy)
  }, [searchParams])

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section style={{ position: 'relative' }}>
      <AppHeader className='main-layout' />
      <CategoryFilterBar
        handleChange={handleChange}
        currCategory={filterBy.category}
      />

      {(!stays) && <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</h1>}
      {!!stays && <StayList stays={stays} />}
      <AppFooter className='main-layout fixed' />
    </section>
  )
}
