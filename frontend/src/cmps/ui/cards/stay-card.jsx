import { useNavigate } from 'react-router'
import classes from './stay-card.module.css'

export function StayCard({ stay }) {
  // console.log(stay)
  const navigate = useNavigate()
  const {
    name,
    imgUrls,
    loc: { city, address },
  } = stay

  console.log(address, 'addresss')
  console.log(city, 'city')

  const citySecond = address.split(',')[1]
  return (
    <div
      className={classes.stayCard}
      onClick={() => {
        navigate(`/stay/${stay._id}`)
      }}>
      <div className={classes.imgContainer}>
        <img src={imgUrls[0]} alt='stay-img' />
      </div>
      <div className={classes.city}>
        <h4>
          <span>{city || address || citySecond}</span>
        </h4>
      </div>
      <div className={`${classes.name} ${classes.ellipsis}`}>
        <span>{name}</span>
      </div>
    </div>
  )
}
