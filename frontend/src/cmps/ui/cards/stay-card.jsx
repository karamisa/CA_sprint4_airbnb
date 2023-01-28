import classes from './stay-card.module.css'

export function StayCard({ stay }) {
  console.log(stay)
  const { name, imgUrls, loc: {city} } = stay
  return (
    <div className={classes.stayCard}>
      <div className={classes.imgContainer}>
        <img src={imgUrls[0]} alt='stay-img' />
      </div>
      <div className={classes.city}>
        <h4>
          <span>{city}</span>
        </h4>
      </div>
      <div className={classes.name}>
        <span>{name}</span>
      </div>
    </div>
  )
}
