import classes from './guest-card.module.css'

export function GuestCard({ guest }) {
  const { fullname, imgURL } = guest
  return (
    <div className={classes.guestCard}>
      <div className={classes.imgContainer}>
        <img src={imgURL} />
      </div>
      <div className={classes.name}>
        <h4>{fullname}</h4>
      </div>
      <div className={classes.text}>Guest</div>
    </div>
  )
}
