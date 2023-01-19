
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CategoryFilterBar } from '../cmps/catergory-filter-bar';
import { StayList } from '../cmps/stay-list/stay-list';
import { useEffectUpdate } from '../customHooks/useEffectUpdate';
import { loadStays } from '../store/stay/stay.action';


export function StayIndex() {
  const [filterBy, setFilterBy] = useState({})

  const stays = useSelector((storeState) => {
    // console.log('storeState:', storeState);
    return storeState.stayModule.stays;
  });




  // useEffect(()=>{
  //   if (!stays || !stays.length) loadStays(filterBy)
  // },)

  useEffectUpdate(()=>{
    loadStays(filterBy)
  }, [filterBy])

  function handleChange({field, value}) {
    setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  }



if (!stays) return <section className='stay-list-container card-grid'>loading</section>;
return (
  <section>
    <CategoryFilterBar  handleChange={handleChange}/>
    <StayList stays={stays} />
  </section>
);
}
