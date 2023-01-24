// import { useFilter } from '../customHooks/useFilter';
import { filterService } from '../services/filter.service';

import { useEffect, useRef } from 'react';
import { Carousel } from './ui/carousel/carousel';

export function CategoryFilterBar({ handleChange, currCategory = 'none' }) {
  const categories = filterService.getCategories();

  function onSelectCategory(newCategory) {
    handleChange({ field: 'category', value: newCategory });
  }

  // const carouselEl = useRef(null);

  // useEffect(() => {
  //   const elementWidth = carouselEl.current.offsetWidth;
  //   const parentWidth = carouselEl.current.parentNode.offsetWidth;
  //   console.log('Element width:', elementWidth);
  //   console.log('Parent width:', parentWidth);
  // }, []);

  return (
    <>
      <section className='main-layout category-filter-bar'>
        {/* <div ref={carouselEl} className='carousel'> */}
        {/* <div className='chevron chevron-left' onClick={prevCategories}>
            <BiChevronLeftCircle />
          </div>
          <div className='chevron chevron-right' onClick={nextCategories}>
            <BiChevronRightCircle />
          </div> */}

        <Carousel>
          {categories.map((category) => {
            return (
              <div
                className={
                  category.url === currCategory ? 'category active' : 'category'
                }
                key={category.url}
                onClick={() => {
                  onSelectCategory(category.url);
                }}>
                <img
                  style={{}}
                  className='icon24 clr-secondary'
                  src={require(`../assets/img/categories/${category.url}.png`)}
                  alt={category.name}
                />
                <p>{category.name}</p>
              </div>
            );
          })}{' '}
        </Carousel>
        {/* </div> */}
      </section>
    </>
  );
}
