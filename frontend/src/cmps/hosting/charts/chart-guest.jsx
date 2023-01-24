import { ChartGuestAge } from './chart-guest-age'
import { ChartGuestSex } from './chat-guest-sex'

export function ChartGuest() {
  return (
    <div className='chart chart-rectangle'>
      <ChartGuestSex />
      <ChartGuestAge />
    </div>
  )
}
