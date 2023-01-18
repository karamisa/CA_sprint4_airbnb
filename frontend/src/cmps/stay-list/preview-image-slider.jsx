import { useState } from 'react';

export function PreviewImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className='image-slider'>
      <button onClick={handlePrevClick}>Prev</button>
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}
