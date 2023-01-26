import { useNavigate, useLocation } from 'react-router-dom'
import { StayPreview } from './stay-preview'
import { useModal } from '../../customHooks/useModal'
import { utilService } from '../../services/util.service'

export function StayList({ stays}) {
  const navigate = useNavigate()
  const { openModal, Modal } = useModal()
  const currLocation = useLocation()

  const handleClick = (stayId) => {
    console.log('stayId', stayId)
    const searchStr = utilService.setAnyBlankParamsWithDefaults(currLocation.search)
    navigate(`/stay/${stayId}${searchStr}`)
  }

if (stays && stays.length===0) return <h1 style={{ textAlign: 'center', marginTop: '20px' }}>No Stays Found</h1>
  return (
    <>
    <div className="details-modal"> <Modal /></div>
    <ul className='card-grid stay-list clean-list main-layout'>
      {stays.map((stay) => {
        return (
          <li
            key={stay._id}
            onClick={() => handleClick(stay._id)}
            className='stay-list-item'>
            <StayPreview stay={stay} openModal={openModal} />
          </li>
        )
      })}
    </ul>
    </>
  )
}
