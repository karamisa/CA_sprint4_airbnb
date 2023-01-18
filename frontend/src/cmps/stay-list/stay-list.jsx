import { useEffect } from 'react';
import { useState } from 'react';
import { stayService } from '../../services/stay.service.local';
import { StayPreview } from './stay-preview';

export function StayList() {
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
    <ul className='card-grid stay-list clean-list main-layout'>
      {stays.map((stay) => (
        <li key={stay._id} className='stay-list-item'>
          <StayPreview stay={stay} />
        </li>
      ))}
    </ul>
  );
}
