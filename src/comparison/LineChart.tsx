import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import React, { CSSProperties } from 'react';
import { Line } from 'react-chartjs-2';
import { Country } from '../db/country';
import { Vehicle } from '../db/vehicle';
import { colorFromEnergy } from '../design/colors';
import { FootprintEstimator } from '../footprintEstimator/footprintEstimator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export function LineChart(props: {
  className?: string, style?: CSSProperties
  country: Country, vehicles: Vehicle[]
}) {
  const { country, vehicles } = props
  const footprintEstimator = new FootprintEstimator()

  const options = {
    responsive: true,
    elements: {
      point:{
        radius: 4,
        pointStyle: 'line'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'kgCO2e'
        },
      },
      x: {
        title: {
          display: true,
          text: 'Total distance in the life of the vehicle (km)'
        }
      }
    }
  }

  const distances: number[] = []
  for (let i = 0; i <= 400000; i += 40000) {
    distances.push(i)
  }

  const data = {
    labels: distances.map(d => `${d} km`),
    datasets: vehicles.map(vehicle => (
      {
        label: vehicle.name,
        data: distances.map(totalDistanceKm => {
          const footprint = footprintEstimator.estimate({ vehicle, totalDistanceKm, country })
          return footprint.productionKgCO2e + footprint.usageKgCO2e
        }),
        backgroundColor: colorFromEnergy(vehicle.energy),
        borderColor: colorFromEnergy(vehicle.energy)
      }
    )),
  }

  return <div
    style={props.style} className={props.className}>
    <Line
      options={options} data={data} />
  </div>
}

