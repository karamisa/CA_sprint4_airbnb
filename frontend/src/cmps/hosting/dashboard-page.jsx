import { ChartInfo } from '../ui/chart-info'
import { ChartGuest } from './charts/chart-guest'
import { ChartIncome } from './charts/chart-income'
import { ChartOccupancy } from './charts/chart-occupancy'
import { ChartRating } from './charts/chart-rating'

export function DashboardPage() {
  const infoIncome = { title: 'Income', amount: 3643, lastMonthAmount: 15 }
  const infoLike = { title: 'Likes', amount: 4, lastMonthAmount: -3 }
  return (
    <div className='dashboard-page secondary-layout'>
      <div className='hero'>
        <h2>Welcome back</h2>
      </div>
      <h3>Dashboard</h3>
      <div className='dashboard'>
        <ChartInfo info={infoIncome} />
        <ChartInfo info={infoLike} />
        <ChartOccupancy />
        <ChartRating />
        <ChartIncome />
        <ChartGuest />
      </div>
    </div>
  )
}
