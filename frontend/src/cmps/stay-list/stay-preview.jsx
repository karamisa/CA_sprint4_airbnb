import { PreviewImageSlider } from './preview-image-slider';
import { PreviewInfo } from './preview-info';

export function StayPreview({ stay }) {
  // console.log('got stay ', stay);
  const imgUrl = stay.imgUrls[0];
  const imgUrls = stay.imgUrls;
  const { price, reviews, type } = stay;

  const {
    loc: { address: location },
  } = stay;

  const info = { price, reviews, location, type };

  return (
    <article className='preview'>
      <PreviewImageSlider imgUrls={imgUrls} />
      <PreviewInfo info={info} />
    </article>
  );
}
