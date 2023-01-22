import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export function DetailsHeart({ cb }) {
  const [like, setLike] = useState(false)
  function handleClick(ev) {
    ev.stopPropagation()
    setLike(!like)
      cb(!like)   
  }

  if (like)
    return (
      <>
      <span onClick={handleClick} style={{ cursor: 'pointer' }} className="details-heart">
        <FaHeart
          style={{
            color: 'red',
            fontSize: 16,
            // position: 'absolute',
            zIndex: 5,
          }}
        />
      </span>
      <span onClick={handleClick} style={{ textDecoration: "underline" }}>Save</span>
      </>
    )

  return (
    <>
    <span onClick={handleClick} style={{ cursor: 'pointer' }} className="details-heart">
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
    <span onClick={handleClick} style={{ textDecoration: "underline" }}>Save</span>
    </>
  )
}
