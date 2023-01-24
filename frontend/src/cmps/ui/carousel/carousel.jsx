import classes from './carousel.module.css';

import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useWindowSize } from '../../../customHooks/useWindowSize';

const LeftNavIcon = (
  <svg
    viewBox='0 0 18 18'
    role='img'
    ariaLabel='Previous'
    focusable='false'
    style={{
      height: '10px',
      width: '10px',
      display: 'block',
      fill: 'currentcolor',
    }}>
    <path
      d='m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z'
      fillRule='evenodd'></path>
  </svg>
);

const RightNavIcon = (
  <svg
    viewBox='0 0 18 18'
    role='img'
    ariaLabel='Next'
    focusable='false'
    style={{
      height: '10px',
      width: '10px',
      display: 'block',
      fill: 'currentcolor',
    }}>
    <path
      d='m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z'
      fillRule='evenodd'></path>
  </svg>
);

const styleHidden = {
  opacity: 0,
  zIndex: -1,
};

const styleShown = {
  opacity: 1,
  zIndex: 1,
};

let isLChevronHidden = true;
let isRChevronHidden = false;

export function Carousel({ children }) {
  const size = useWindowSize();
  const [pages, setPages] = useState([]);
  useEffect(() => {
    setPages(children);
  }, []);

  // container with items
  let containerEl = useRef();

  // current offset
  const [offset, setOffset] = useState(0);
  // window and container width
  let [winWidth, setWinWidth] = useState(0);
  let [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setWinWidth(containerEl.current.parentNode.offsetWidth);
    setContainerWidth(containerEl.current.scrollWidth);

    if (offset <= -1 * (containerWidth - winWidth)) {
      // nextItems();
    }
  }, [
    containerEl.current?.scrollWidth,
    containerEl.current?.parentNode.offsetWidth,
    size,
  ]);

  console.log(
    'containerEl.current.parentNode.offsetWidth:',
    containerEl.current?.parentNode.offsetWidth,
    'containerEl.current.scrollWidth',
    containerEl.current?.scrollWidth
  );

  // navigation
  function prevItems() {
    setOffset((prev) => {
      let diff = prev + winWidth * 0.85;

      if (diff >= 0) {
        diff = 0;
        console.log('here:true', diff);
        isLChevronHidden = true;
      } else isLChevronHidden = false;
      return diff;
    });
  }

  function nextItems() {
    setOffset((prev) => {
      let diff = prev - winWidth * 0.85;
      if (diff <= -1 * (containerWidth - winWidth)) {
        diff = -1 * (containerWidth - winWidth);

        console.log('ontainerWidth - winWidth:', containerWidth, winWidth);

        isRChevronHidden = true;
      } else isRChevronHidden = false;

      return diff;
    });
  }

  return (
    <div className={`carousel ${classes.carousel}`}>
      {/* navigation */}
      <div
        className={`${isLChevronHidden ? 'hidden' : ''} ${classes.chevron} ${
          classes.chevronLeft
        }`}
        onClick={prevItems}>
        <span className={`${classes.navIcon} ${classes.left}`}>
          {LeftNavIcon}
        </span>
      </div>
      <div
        className={`${classes.chevron} ${classes.chevronRight}`}
        onClick={nextItems}>
        <span
          className={`${isRChevronHidden ? 'hidden' : ''} ${classes.navIcon} ${
            classes.right
          }`}>
          {RightNavIcon}
        </span>
      </div>

      <div className={classes.carouselWindow}>
        {/* items */}
        <div
          ref={containerEl}
          style={{ transform: `translateX(${offset}px)` }}
          className={classes.carouselContainer}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* 
{
  <div className='carousel-item'>item1</div>
<div className='carousel-item'>item2</div>
<div className='carousel-item'>item3</div>
<div className='carousel-item'>item4</div>
<div className='carousel-item'>item4</div>
}
 */
