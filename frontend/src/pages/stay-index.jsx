
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilterBar } from '../cmps/catergory-filter-bar';
import { StayList } from '../cmps/stay-list/stay-list';
import { loadStays } from '../store/stay/stay.action';


export function StayIndex() {

  const [searchParams, setSearchParams] = useSearchParams()
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  const filterBy = {category: searchParams.get('category')}

  useEffect(() => {
    loadStays(filterBy)
  }, [searchParams])

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  if (!stays) return <section className='stay-list-container card-grid'>loading</section>;
  return (
    <section>
      <CategoryFilterBar handleChange={handleChange} currcategory={filterBy.category} />
      <StayList stays={stays} />
    </section>
  )
}
