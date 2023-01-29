import { useLocation } from 'react-router'
import { utilService } from '../../services/util.service'
import { RatingReview } from '../ui/rating-review'

export function PreviewInfo({ info }) {
  const url = useLocation()
  return (
    <>
      <p className='flex justify-between'>
        <span className='text-bold ellipsis'>{info.location}</span>{' '}
        <RatingReview reviews={info.reviews} />
      </p>
      <p className='text-grey'>{info.type}</p>
      <p className='text-grey'>
        {/stay$/.test(url.pathname) && 'Feb 1 - Feb 20'}
        {/wishlist$/.test(url.pathname) && `${info.capacity} beds`}
      </p>
      <p className='text-bold'>
        {utilService.formatCurrency(info.price)}{' '}
        <span style={{ fontFamily: 'cereal-Book' }}> night</span>
      </p>
    </>
  )
}
