import { useEffect, useRef, useState } from 'react';
import { filterService } from '../services/filter.service';

const categories = filterService.getCategories();

export function CategoryFilterBar() {
  return (
    <div className='carousel' role='radiogroup'>
      {categories.map((category) => {
        return (
          <div role='radio'>
            <img src={`${category.url}`} alt={category.name} />
          </div>
        );
      })}

      {/* <button onClick={prevCategories}>Prev</button>
      <button onClick={displayCategories}>Next</button> */}
    </div>
  );
}
