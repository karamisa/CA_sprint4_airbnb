import { StayPreview } from './stay-preview';
import { useNavigate, useLocation } from 'react-router-dom';

export function StayList({ stays }) {
  const navigate = useNavigate();
  const currSearch = useLocation()


  if (!stays)
    <ul className='card-grid stay-list clean-list main-layout'>Loading..</ul>;
  return (
    <ul className='card-grid stay-list clean-list main-layout'>
      {stays.map((stay) => {
        // console.log('stay:', stay);
        return (
          <li
            key={stay._id}
            onClick={() => navigate(`/stay/${stay._id}${currSearch.search}`)}
            className='stay-list-item'>
            <StayPreview stay={stay} />
          </li>
        );
      })}
    </ul>
  );
}
