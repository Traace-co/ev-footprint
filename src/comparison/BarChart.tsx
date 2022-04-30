import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Footprint } from '../footprintEstimator/footprintEstimator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export function BarChart(props: {
  footprints: { name: string, footprint: Footprint }[]
}) {
  const { footprints } = props

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = footprints.map(fp => fp.name)

  const productionData = footprints.map(fp => fp.footprint.productionKgCO2e)
  const usageData = footprints.map(fp => fp.footprint.usageKgCO2e)

  const data = {
    labels,
    datasets: [
      {
        label: 'Production',
        data: productionData,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Usage',
        data: usageData,
        backgroundColor: 'rgb(75, 192, 192)',
      }
    ],
  };

  return <Bar options={options} data={data} />;
}

