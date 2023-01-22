import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export function Heart({ cb = (like) => console.log(like), props }) {
  const [like, setLike] = useState(false);
  function handleClick(ev) {
    ev.stopPropagation();
    setLike((like) => {
      cb(!like);
      return !like;
    });
  }

  if (like)
    return (
      <span onClick={handleClick} style={{ cursor: 'pointer' }}>
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
    );

  return (
    <span onClick={handleClick} style={{ cursor: 'pointer' }}>
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
  );

  //   return (
  //     <span onClick={handleClick} style={{ cursor: 'pointer' }}>
  //       {like ? (
  //         <FaHeart style={{ color: 'red', fontSize: 24 }} />
  //       ) : (
  //         <FaRegHeart style={{ color: 'red', fontSize: 24 }} />
  //       )}
  //     </span>
  //   );
}
