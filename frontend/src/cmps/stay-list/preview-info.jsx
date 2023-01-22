import { utilService } from '../../services/util.service';

export function PreviewInfo({ info }) {
  return (
    <>
      <p className='flex justify-between'>
        <span className='text-bold ellipsis'>{info.location}</span>{' '}
        {/* <RatingReview reviews={info.reviews} /> */}
      </p>
      <p className='text-grey'>Distance</p>
      <p className='text-grey'>Dates</p>
      <p className='text-bold'>
        {utilService.formatCurrency(info.price)} night
      </p>
    </>
  );
}
