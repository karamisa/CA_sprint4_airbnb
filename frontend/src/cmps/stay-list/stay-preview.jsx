import { PreviewImageSlider } from './preview-image-slider';
import { PreviewInfo } from './preview-info';

export function StayPreview({ stay }) {
  console.log('got stay ', stay);
  const imgUrl = stay.imgUrls[0];
  const { price } = stay;

  console.log('imgUrl:', imgUrl, 'price', price);
  return (
    <article>
      <PreviewImageSlider imgUrl={imgUrl} />
      <PreviewInfo price={price} />
    </article>
  );
}
