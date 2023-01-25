import { filterService } from '../services/filter.service'
import filterIcon from '../assets/img/filter.svg'

import { Carousel } from './ui/carousel/carousel'
import { BtnSquareSecond } from './ui/buttons/btn-square-second'
import useOnScreen from '../customHooks/useOnScreen'
import { useRef } from 'react'

const buttonStyle = {
  height: '48px',
  marginInlineStart: '24px',
  fontSize: '12px',
}

export function CategoryFilterBar({ handleChange, currCategory = 'none' }) {
  const filterRef = useRef()
  const topFilterVisible = useOnScreen(filterRef, '-79px')
  const categories = filterService.getCategories()

  const scrollClass = topFilterVisible ? '' : 'scrolling'
  function onSelectCategory(newCategory) {
    handleChange({ field: 'category', value: newCategory })
  }

  return (
    <>
    <div ref={filterRef} className='filter-ref'></div>
      <section className={`main-layout filter-bar ${scrollClass}`} >
        <Carousel>
          {categories.map((category) => {
            return (
              <div
                className={
                  category.url === currCategory ? 'category active' : 'category'
                }
                key={category.url}
                onClick={() => {
                  onSelectCategory(category.url)
                }}>
                <img
                  style={{}}
                  className='icon24 clr-secondary'
                  src={require(`../assets/img/categories/${category.url}.png`)}
                  alt={category.name}
                />
                <p className='category-name'>{category.name}</p>
              </div>
            )
          })}{' '}
        </Carousel>
        <div className='btn-container'>
          <BtnSquareSecond style={buttonStyle}>
            <img className='filter-bar-btn-img' src={filterIcon} alt='Icon' />{' '}
            Filters
          </BtnSquareSecond>
        </div>
      </section>
    </>
  )
}
