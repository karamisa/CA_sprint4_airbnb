import { useSelector } from 'react-redux'
import { PreviewImageSlider } from './preview-image-slider'
import { PreviewInfo } from './preview-info'

export function StayPreview({ stay, openModal }) {
  const user = useSelector((state) => state.userModule.user)
  const isLiked = !!user
    ? stay?.likedByUsers?.find((miniUser) => miniUser._id === user._id)
    : false

  const imgUrls = stay.imgUrls
  const { price, reviews, type, capacity } = stay

  const {
    loc: { address: location },
  } = stay




  const info = { price, reviews, location, type, capacity }
  return (
    <article className='preview'>
      <PreviewImageSlider
        imgUrls={imgUrls}
        user={user}
        openModal={openModal}
        isLiked={isLiked}
        stayId={stay._id}
      />
      <PreviewInfo info={info} />
    </article>
  )
}
