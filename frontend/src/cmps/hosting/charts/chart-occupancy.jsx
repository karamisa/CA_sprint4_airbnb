import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { utilService } from '../../../services/util.service'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  scales: {
    y: {
      max: 100,
      ticks: {
        callback: (value) => `${value} %`,
      },
    },
  },

  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          // let label = context.dataset.label || ''
          let label = ` Occupancy in ${context.label} ${context.parsed.y}%`
          // console.log('context:', context)
          return label
        },
      },
    },
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Occupancy',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Occupancy',
      data: labels.map(() => utilService.getRandomIntInclusive(20, 90)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export function ChartOccupancy() {
  return (
    <div className='chart chart-rectangle'>
      <Bar options={options} data={data} />
    </div>
  )
}
