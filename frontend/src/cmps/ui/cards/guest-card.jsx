import { useNavigate } from 'react-router'
import classes from './guest-card.module.css'

export function GuestCard({ guest }) {
  const { fullname, imgUrl } = guest
  const navigate = useNavigate()

  return (
    <div
      className={classes.guestCard}
      onClick={() => {
        navigate('/user/inbox')
      }}>
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
