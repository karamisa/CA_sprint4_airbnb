import classes from './guest-card.module.css'

export function GuestCard({ guest }) {
  const { fullname, imgUrl } = guest
  return (
    <div className={classes.guestCard}>
      <div className={classes.imgContainer}>
        <img src={imgUrl} alt='buyer-avatar' />
      </div>
      <div className={classes.name}>
        <h4>{fullname}</h4>
      </div>
      <div className={classes.text}>Guest</div>
    </div>
  )
}
