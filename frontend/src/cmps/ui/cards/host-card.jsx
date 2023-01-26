import classes from './host-card.module.css'

export function HostCard({ host }) {
  const { fullname, imgUrl } = host
  return (
    <div className={classes.hostCard}>
      <div className={classes.imgContainer}>
        <img src={imgUrl} />
      </div>
      <div className={classes.name}>
        <h4>{fullname}</h4>
      </div>
      <div className={classes.text}>Host</div>
    </div>
  )
}
