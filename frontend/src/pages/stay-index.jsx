import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { CategoryFilterBar } from '../cmps/category-filter-bar'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { AppHeader } from '../cmps/header-footer/app-header'
import { IndexLoader } from '../cmps/stay-list/index-loader'
import { StayList } from '../cmps/stay-list/stay-list'
import { loadStays } from '../store/stay/stay.action'

export function StayIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
  console.log(isLoading)

  //TODO: add more filters for params
  const filterBy = {
    category: searchParams.get('category'),
    location: searchParams.get('location'),
    // TODO ? is this good to filter by dates?
    startDate: new Date().setDate(new Date().getDate() + 1),
    endDate: new Date().setDate(new Date().getDate() + 4),
  }

  useEffect(() => {
    if (!stays || !stays.length) loadStays(filterBy)
  }, [searchParams])

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section style={{ position: 'relative' }}>
      <AppHeader className='main-layout stay-index' />
      <CategoryFilterBar
        handleChange={handleChange}
        currCategory={filterBy.category}
      />
      {isLoading && <IndexLoader/>  }
      {/* {(!!stays) && <IndexLoader/>  } */}
      {!!stays && <StayList stays={stays} />}
      <AppFooter className='main-layout stay-index-footer fixed' />
    </section>
  )
}
