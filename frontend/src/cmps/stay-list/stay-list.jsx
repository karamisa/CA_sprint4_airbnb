import { StayPreview } from './stay-preview';
import { useNavigate } from 'react-router-dom';

export function StayList({ stays }) {
  const navigate = useNavigate();

  if (!stays)
    <ul className='card-grid stay-list clean-list main-layout'>Loading..</ul>;
  return (
    <ul className='card-grid stay-list clean-list main-layout'>
      {stays.map((stay) => {
        console.log('stay:', stay);
        return (
          <li
            key={stay._id}
            onClick={() => navigate(`/stay/${stay._id}`)}
            className='stay-list-item'>
            <StayPreview stay={stay} />
          </li>
        );
      })}
    </ul>
  );
}
