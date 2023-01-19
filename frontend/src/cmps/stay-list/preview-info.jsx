import { RatingReview } from '../util-cmps/rating-review';

export function PreviewInfo({ info }) {
  return (
    <>
      <p className='flex justify-between'>
        <span className='text-bold ellipsis'>{info.location}</span>{' '}
        <RatingReview reviews={info.reviews} />
      </p>
      <p className='text-grey'>Distance</p>
      <p className='text-grey'>Dates</p>
      <p>{info.price.toLocaleString()}</p>
    </>
  );
}
