import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export function Heart({ handleClick, isLiked=false, isLoggedin=false }) {
  const [like, setLike] = useState(isLiked)
  function onClick(ev) {
    ev.stopPropagation()
    handleClick()
    if(!isLoggedin) return
    setLike(!like)
  }

  if (like)
    return (
      <span onClick={onClick} style={{ cursor: 'pointer' }}>
        <FaHeart
          style={{
            color: 'red',
            fontSize: 25.5,
            position: 'absolute',
            zIndex: 5,
          }}
        />
        <FaRegHeart
          style={{
            color: 'white',
            fontSize: 26,
            position: 'absolute',
            zIndex: 6,
          }}
        />
      </span>
    )

  return (
    <span onClick={onClick} style={{ cursor: 'pointer' }}>
      <FaHeart
        style={{
          color: 'black',
          opacity: 0.5,
          fontSize: 25.5,
          position: 'absolute',
          zIndex: 5,
        }}
      />
      <FaRegHeart
        style={{
          color: 'white',
          fontSize: 26,
          position: 'absolute',
          zIndex: 6,
        }}
      />
    </span>
  )
}
