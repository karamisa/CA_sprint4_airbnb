import { PreviewImageSlider } from './preview-image-slider';
import { PreviewInfo } from './preview-info';

export function StayPreview({ stay }) {
  // console.log('got stay ', stay);
  const imgUrl = stay.imgUrls[0];
  const { price, reviews } = stay;

  const {
    loc: { address: location },
  } = stay;

  const info = { price, reviews, location };

  return (
    <article className='preview'>
      <PreviewImageSlider imgUrl={imgUrl} />
      <PreviewInfo info={info} />
    </article>
  );
}
