import Slider from 'react-slick';

import { useState } from 'react';
import { Heart } from '../ui/heart';
import { ImageCarousel } from './image-carousel';

export function PreviewImageSlider({ imgUrls }) {
  console.log('imgUrls', imgUrls)

  const imgs = imgUrls.map((item, index) => {
    return {
      id: index,
      src: imgUrls[index],
      alt: `Image ${index + 1}`

    }
  })
  // const [currentIndex, setCurrentIndex] = useState(0);
  const imgUrl = imgUrls[0];
  // const handlePrevClick = () => {
  //   setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  // };

  // const handleNextClick = () => {
  //   setCurrentIndex((currentIndex + 1) % images.length);
  // };

  return (
    <div className='image-slider square-ratio'>
      <span className='heart'>
        <Heart />
      </span>
      {/* <button onClick={handlePrevClick}>Prev</button> */}
      {/* <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} /> */}

      {/* <img src={imgUrl} alt='stay' /> */}

      <ImageCarousel imgs={imgs} />


      {/* <button onClick={handleNextClick}>Next</button> */}
    </div>
  );
}
