// import { Trip } from './trip'
import { useNavigate } from 'react-router-dom'


export function WishlistList({ stays , onRemoveLike}) {

  const navigate = useNavigate()

  if (!stays) return <div></div>
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Stay Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Price</th>
            <th>Image</th>
            <th>Remove</th>
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
      </table>
    </div>
  )
}
