import { PreviewImageSlider } from './preview-image-slider';
import { PreviewInfo } from './preview-info';

export function StayPreview({ stay }) {
  // console.log('got stay ', stay);
  const imgUrl = stay.imgUrls[0];
  const { price } = stay;

  const {
    loc: { address: location },
  } = stay;
  const rate = stay.reviews[0].rate;

  const info = { price, rate, location };

  // console.log('location:', location);

  // console.log('imgUrl:', imgUrl, 'price', price);

  return (
    <article>
      <PreviewImageSlider imgUrl={imgUrl} />
      <PreviewInfo info={info} />
    </article>
  );
}
