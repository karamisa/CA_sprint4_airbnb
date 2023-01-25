import { useEffect } from 'react'
import { Heart } from '../ui/heart'
import { Slider } from '../ui/slider/slider'

export function PreviewImageSlider({
  imgUrls,
  user,
  isLiked,
  onLikeStay,
  stayId,
}){



  const isLoggedin = user ? true : false

  return (
    <div className='image-slider almost-square-ratio'>
      <span className='heart'>
        <Heart
          handleClick={() => onLikeStay(stayId)}
          isLiked={isLiked}
          isLoggedin={isLoggedin}
        />
      </span>
      <Slider>
        {imgUrls.map((url, idx) => (
          <img key={idx} src={url} alt='Stay' />
        ))}
      </Slider>
    </div>
  )
        }
