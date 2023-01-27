import { useLocation, useNavigate } from 'react-router-dom'
import { useModal } from '../customHooks/useModal'
import { utilService } from '../services/util.service'
import { StayPreview } from './stay-list/stay-preview'
import arrowLeftImg from '../assets/img/arrow-left.svg'
import { AppFooter } from './header-footer/app-footer'

export function WishlistList({ stays, onRemoveLike }) {
  const { openModal, Modal } = useModal()
  const navigate = useNavigate()
  const currLocation = useLocation()

  const handleClick = (stayId) => {
    const searchStr = utilService.setAnyBlankParamsWithDefaults(
      currLocation.search
    )
    navigate(`/stay/${stayId}${searchStr}`)
  }

  if (!stays) return <div></div>
  return (
    <>
      {/* <div className='details-modal'>
        {' '}
        <Modal />
      </div> */}

      <header className='wishlist-title main-layout full flex'>
        <div className='icon-svg'>
          <img
            src={arrowLeftImg}
            className='arrow-img'
            alt='arrowLeftImg'
            onClick={() => navigate(-1)}
          />
        </div>
        <div>{<h2>Wishlist</h2>}</div>
      </header>
      {/* 
      <div className='icon-svg'>
        <img
          src={arrowLeftImg}
          className='arrow-img'
          alt='arrowLeftImg'
          onClick={() => navigate(-1)}
        />
      </div> */}
      <ul className='card-grid stay-list clean-list'>
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

      <AppFooter className='main-layout wishlist-footer fixed' />
    </>

    // <div>
    // {
    /* <table>
        <thead>
          <tr>
            <th>Stay Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Price</th>
            <th>Image</th>
            <th>Remove</th/
          </tr>
        </thead>
        <tbody>
          {stays.map((stay, index) => (
            <tr key={stay._id} onClick={() => navigate(`/stay/${stay._id}`)} style={{ cursor: "pointer" }}>
              <td>{stay.name}</td>
              <td>{stay.loc.address}</td>
              <td>{stay.type}</td>
              <td>{stay.price}</td>
              <td><img src={stay.imgUrls[0]} alt={index} className="wishlist-img almost-square-ratio" /></td>
              <td onClick={(ev) => onRemoveLike(stay._id, ev)} style={{color: "red", textAlign:"center"}}>X</td>
            </tr>
          ))}
        </tbody>
      </table> }*/
    // </div>
  )
}
