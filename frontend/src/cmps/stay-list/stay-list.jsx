import { useNavigate, useLocation } from 'react-router-dom'
import { StayPreview } from './stay-preview'
import { likeStay } from '../../store/stay/stay.action'
import { useSelector } from 'react-redux'
import { useModal } from '../../customHooks/useModal'
import { LoginSignup } from '../login-signup'

export function StayList({ stays}) {
  const navigate = useNavigate()
  const { openModal, Modal } = useModal()
  const currSearch = useLocation()
  const user = useSelector(state => state.userModule.user)

  async function onLikeStay(stayId) {
    if (!user){
      openModal(<LoginSignup />)
      return
    } 
    await likeStay(stayId)
  }

  if (!stays)
    <ul className='card-grid stay-list clean-list main-layout'>Loading...</ul>
  return (
    <>
    <div className="details-modal"> <Modal /></div>
    <ul className='card-grid stay-list clean-list main-layout'>
      {stays.map((stay) => {
        return (
          <li
            key={stay._id}
            onClick={() => navigate(`/stay/${stay._id}${currSearch.search}`)}
            className='stay-list-item'>
            <StayPreview stay={stay} onLikeStay={onLikeStay} />
          </li>
        )
      })}
    </ul>
    </>
  )
}
