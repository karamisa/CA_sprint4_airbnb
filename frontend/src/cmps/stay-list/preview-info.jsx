import { utilService } from '../../services/util.service'
import { RatingReview } from '../ui/rating-review'

export function PreviewInfo({ info }) {
  return (
    <>
      <p className='flex justify-between'>
        <span className='text-bold ellipsis'>{info.location}</span>{' '}
        <RatingReview reviews={info.reviews} />
      </p>
      <p className='text-grey'>{info.type}</p>
      <p className='text-grey'>Dates</p>
      <p className='text-bold'>
        {utilService.formatCurrency(info.price)}{' '}
        <span style={{ fontFamily: 'cereal-Book' }}> night</span>
      </p>
    </>
  )
}
