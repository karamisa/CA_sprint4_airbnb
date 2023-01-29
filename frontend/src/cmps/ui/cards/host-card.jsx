import { useNavigate } from 'react-router'
import classes from './host-card.module.css'

export function HostCard({ host }) {
  const { fullname, imgUrl } = host
  const navigate = useNavigate()
  return (
    <div
      className={classes.hostCard}
      onClick={() => {
        navigate('/user/inbox')
      }}>
      <div className={classes.imgContainer}>
        <img src={imgUrl} alt='host' />
      </div>
      <div className={classes.name}>
        <h4>{fullname}</h4>
      </div>
      <div className={classes.text}>Host</div>
    </div>
  )
}
