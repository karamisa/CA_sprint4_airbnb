import { useEffect, useState } from 'react';
import { CategoryFilterBar } from '../cmps/catergory-filter-bar';
import { StayList } from '../cmps/stay-list/stay-list';
import { stayService } from '../services/stay.service.local';

export function StayIndex() {
  const [stays, setStays] = useState([]);

  useEffect(() => {
    loadStays();
  }, []);

  function loadStays() {
    stayService.query().then((stays) => {
      console.log('loaded stays:', stays);
      setStays(stays);
    });
  }
  if (!stays)
    return <section className='stay-list-container card-grid'>loading</section>;
  return (
    <section>
      <h1>Stay Index</h1>
      <CategoryFilterBar />
      <StayList stays={stays} />
    </section>
  );
}
