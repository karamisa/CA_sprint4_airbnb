import { useSelector } from 'react-redux'
import { likeStay } from '../../store/stay/stay.action'
import { PreviewImageSlider } from './preview-image-slider'
import { PreviewInfo } from './preview-info'
 
export function StayPreview({ stay, onLikeStay }) {
  const user = useSelector(state => state.userModule.user)

  // async function onLikeStay(stayId) {
  //     if (!user){
  //       // openModal(<LoginSignup />)
  //       return
  //     } 
  //     await likeStay(stayId)
  //   }
  console.log(stay)
 const isLiked = (!!user) ? stay?.likedByUsers?.find(miniUser => miniUser._id === user._id) : false
  
  // console.log('got stay ', stay)
  // const imgUrl = stay.imgUrls[0]
  const imgUrls = stay.imgUrls
  const { price, reviews, type } = stay

  const {
    loc: { address: location },
  } = stay

  const info = { price, reviews, location, type }

  return (
    <article className='preview'>
      <PreviewImageSlider imgUrls={imgUrls} user={user} onLikeStay={onLikeStay} isLiked={isLiked} stayId={stay._id}/>
      <PreviewInfo info={info} />
    </article>
  )
}
