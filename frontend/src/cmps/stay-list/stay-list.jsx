import { StayPreview } from './stay-preview';

export function StayList({stays}) {
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
