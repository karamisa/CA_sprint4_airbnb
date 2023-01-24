import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export function DetailsHeart({handleClick, isLiked= false }) {
  const [like, setLike] = useState(isLiked)
  function onClick(ev) {
    // ev.stopPropagation()
    setLike(!like)
    handleClick()
  }

  if (like)
    return (
      <>
      <span onClick={onClick} style={{ cursor: 'pointer' }} className="details-heart">
        <FaHeart
          style={{
            color: 'red',
            fontSize: 16,
            // position: 'absolute',
            zIndex: 5,
          }}
        />
      </span>
      <span onClick={onClick} style={{ textDecoration: "underline" }}>Save</span>
      </>
    )

  return (
    <>
    <span onClick={onClick} style={{ cursor: 'pointer' }} className="details-heart">
      <FaHeart
        style={{
          color: 'white',
          opacity: 1,
          fontSize: 16,
          // position: 'absolute',
          zIndex: 5,
        }}
      />
      <FaRegHeart
        style={{
          color: 'black',
          fontSize: 16,
          // position: 'absolute',
          zIndex: 6,
        }}
      />
    </span>
    <span onClick={onClick} style={{ textDecoration: "underline" }}>Save</span>
    </>
  )
}
