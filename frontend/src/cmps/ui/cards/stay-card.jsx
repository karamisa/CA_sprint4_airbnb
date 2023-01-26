import classes from './stay-card.module.css'

export function StayCard({ stay }) {
  console.log('stay in card:', stay)
  const { name, imgUrl } = stay
  return (
    <div className={classes.stayCard}>
      <div className={classes.imgContainer}>
        <img src='https://picsum.photos/100/100' />
      </div>
      <div className={classes.city}>
        <h4>
          <span>City</span>
        </h4>
      </div>
      <div className={classes.name}>
        <span>{stay.name}</span>
      </div>
    </div>
  )
}
