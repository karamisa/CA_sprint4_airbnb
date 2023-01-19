
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CategoryFilterBar } from '../cmps/catergory-filter-bar';
import { StayList } from '../cmps/stay-list/stay-list';
import { loadStays } from '../store/stay/stay.action';


export function StayIndex() {
  const stays = useSelector((storeState) => {
    // console.log('storeState:', storeState);
    return storeState.stayModule.stays;
  });


  useEffect(()=>{
    if (!stays) loadStays()
  }, [stays])












if (!stays) return <section className='stay-list-container card-grid'>loading</section>;
return (
  <section>
    <CategoryFilterBar />
    <StayList stays={stays} />
  </section>
);
}
