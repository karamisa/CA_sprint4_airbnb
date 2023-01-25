import { useNavigate, useLocation } from 'react-router-dom'
import { StayPreview } from './stay-preview'
import { useModal } from '../../customHooks/useModal'

export function StayList({ stays}) {
  const navigate = useNavigate()
  const { openModal, Modal } = useModal()
  const currSearch = useLocation()

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
            <StayPreview stay={stay} openModal={openModal} />
          </li>
        )
      })}
    </ul>
    </>
  )
}
