import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { utilService } from '../../../services/util.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Rating',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Cleanliness',
      data: labels.map(() => utilService.getRandomIntInclusive(2, 5)),
      borderColor: 'rgb(46, 80, 119)',
      backgroundColor: 'rgba(46, 80, 119, 0.5)',
    },
    {
      label: 'Communication',
      data: labels.map(() => utilService.getRandomIntInclusive(2, 5)),
      borderColor: 'rgb(182, 196, 84)',
      backgroundColor: 'rgba(182, 196, 84, 0.5)',
    },
    {
      label: 'Check-in',
      data: labels.map(() => utilService.getRandomIntInclusive(2, 5)),
      borderColor: 'rgb(44, 166, 164)',
      backgroundColor: 'rgba(44, 166, 164, 0.5)',
    },
    {
      label: 'Accuracy',
      data: labels.map(() => utilService.getRandomIntInclusive(2, 5)),
      borderColor: 'rgb(236, 190, 180)',
      backgroundColor: 'rgba(236, 190, 180, 0.5)',
    },
    {
      label: 'Location',
      data: labels.map(() => utilService.getRandomIntInclusive(2, 5)),
      borderColor: 'rgb(187, 181, 189)',
      backgroundColor: 'rgba(187, 181, 189, 0.5)',
    },
    {
      label: 'Average',
      data: labels.map(() => utilService.getRandomIntInclusive(3, 4)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function ChartRating() {
  return (
    <div className='chart chart-rectangle'>
      <Line options={options} data={data} />
    </div>
  );
}
