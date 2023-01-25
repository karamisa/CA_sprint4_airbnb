import { Children, useEffect, useRef } from 'react'
import { cloneElement } from 'react'
import { useState } from 'react'
import classes from './slider.module.css'

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
)

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
)

export function Slider({ children }) {
  const [page, setPage] = useState([])
  let [winWidth, setWinWidth] = useState(0)
  let containerEl = useRef()
  const leftNavRef = useRef()
  const rightNavRef = useRef()

  useEffect(() => {
    setWinWidth(containerEl.current.offsetWidth)

    setPage(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            maxWidth: `100%`,
            minWidth: `100%`,
          },
        })
      })
    )
  }, [])

  // current offset
  const [offset, setOffset] = useState(0)

  function prevItems(ev) {
    ev.stopPropagation()
    rightNavRef.current.classList.remove(classes.hidden)

    setOffset((prev) => {
      if (prev + winWidth === 0)
        leftNavRef.current.classList.add(classes.hidden)
      else leftNavRef.current.classList.remove(classes.hidden)

      return Math.min(prev + winWidth, 0)
    })
  }

  function nextItems(ev) {
    ev.stopPropagation()
    leftNavRef.current.classList.remove(classes.hidden)
    const maxOffset = -(winWidth * (children.length - 1))

    setOffset((prev) => {
      if (prev - winWidth === maxOffset)
        rightNavRef.current.classList.add(classes.hidden)
      else rightNavRef.current.classList.remove(classes.hidden)

      return Math.max(prev - winWidth, maxOffset)
    })
  }

  return (
    <div className={`${classes.carousel}`}>
      {/* navigation */}

      <span
        ref={leftNavRef}
        onClick={prevItems}
        className={` ${classes.hidden} ${classes.navIconLeft} ${classes.navIcon} `}>
        {LeftNavIcon}
      </span>

      <span
        ref={rightNavRef}
        onClick={nextItems}
        className={`${classes.navIconRight} ${classes.navIcon}`}>
        {RightNavIcon}
      </span>

      <div className={classes.carouselWindow}>
        {/* items */}
        <div
          ref={containerEl}
          style={{ transform: `translateX(${offset}px)` }}
          className={classes.carouselContainer}>
          {page}
        </div>
      </div>
    </div>
  )
}
