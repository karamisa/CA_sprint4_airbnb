import { Heart } from '../ui/heart';
import { Slider } from '../ui/slider/slider';
import { ImageCarousel } from './image-carousel';

export function PreviewImageSlider({ imgUrls }) {
  console.log('imgUrls', imgUrls);

  const imgs = imgUrls.map((url, index) => (
    <img id={index} src={url} alt='Stay' />
  ));

  return (
    <div className='image-slider square-ratio'>
      <span className='heart'>
        <Heart />
      </span>
      <Slider>
        {imgs.map((image, idx) => (
          <div key={idx}>{image}</div>
        ))}
      </Slider>
    </div>
  );
}
