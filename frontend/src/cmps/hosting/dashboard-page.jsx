import { ChartGuest } from './charts/chart-guest';
import { ChartIncome } from './charts/chart-income';
import { ChartOccupancy } from './charts/chart-occupancy';
import { ChartRating } from './charts/chart-rating';

export function DashboardPage() {
  return (
    <div className='dashboard'>
      <ChartOccupancy />
      <ChartRating />
      <ChartIncome />
      <ChartGuest />
    </div>
  );
}
