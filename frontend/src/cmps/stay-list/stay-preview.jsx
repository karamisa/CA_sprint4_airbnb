import { PreviewImageSlider } from './preview-image-slider';
import { PreviewInfo } from './preview-info';

export function StayPreview({ stay }) {
  return (
    <article>
      <PreviewImageSlider />
      <PreviewInfo />
    </article>
  );
}
