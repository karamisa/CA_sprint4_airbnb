import { useOrderStatus } from '../../customHooks/useOrderStatus'
import { BtnSquare } from '../ui/buttons/btn-square'
import { HostCard } from '../ui/cards/host-card'
import { StayCard } from '../ui/cards/stay-card'

export function Trip({ stays, order, hosts }) {
  const { orderForPrecessing, cancelOrder } = useOrderStatus(order)
  // console.log('staydds:', stays)
  if (!orderForPrecessing) return <></>
  // console.log('order:', orderForPrecessing)

  function findHost(hostId) {
    const host = hosts.find((host) => host._id === hostId)
    return host
  }

  return (
    <>
      <td>
        <StayCard stay={orderForPrecessing.stay} />
      </td>
      {/* <td>{orderForPrecessing.stay.name}</td> */}
      <td>
        <HostCard host={findHost(orderForPrecessing.hostId)} />
      </td>
      <td>
        {new Date(orderForPrecessing.startDate).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
        -
        {new Date(orderForPrecessing.endDate).toLocaleString('en-US', {
          day: 'numeric',
        })}
      </td>
      <td>{orderForPrecessing.stay.price}</td>
      <td>{orderForPrecessing.status}</td>
      <td>
        <BtnSquare onClick={() => cancelOrder()}>Cancel</BtnSquare>
      </td>
    </>
  )
}
