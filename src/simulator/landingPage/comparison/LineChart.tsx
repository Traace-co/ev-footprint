import { Typography } from 'antd';
import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { CSSProperties } from 'react';
import { Line } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';
import { colorFromEnergy } from '@/components/design/colors';
import { Country } from '../../db/country';
import { Vehicle } from '../../db/vehicle';
import { FootprintEstimator } from '../../footprintEstimator/footprintEstimator';

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

  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' }) // sm

  const { Paragraph } = Typography

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      point: {
        radius: 1,
        pointStyle: 'line'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'tCO2e'
        },
        min: 0
      },
      x: {
        title: {
          display: true,
          text: 'Total distance in the life of the vehicle (km)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: isBigScreen ? 'right' : 'bottom',
        maxWidth: 400
      }
    }
  } as any

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
          return footprint.totalKgCO2e / 1000
        }),
        backgroundColor: colorFromEnergy(vehicle.energy),
        borderColor: colorFromEnergy(vehicle.energy)
      }
    )),
  }

  const vehicle1 = vehicles[0]
  const vehicle1FixedValue = footprintEstimator.estimate({ vehicle: vehicle1, country, totalDistanceKm: 0 }).totalKgCO2e
  const vehicle1Coefficient = footprintEstimator.estimate({ vehicle: vehicle1, country, totalDistanceKm: 1 }).totalKgCO2e - vehicle1FixedValue

  const vehicle2 = vehicles[1]
  const vehicle2FixedValue = footprintEstimator.estimate({ vehicle: vehicle2, country, totalDistanceKm: 0 }).totalKgCO2e
  const vehicle2Coefficient = footprintEstimator.estimate({ vehicle: vehicle2, country, totalDistanceKm: 1 }).totalKgCO2e - vehicle2FixedValue

  const threshold = (vehicle2FixedValue - vehicle1FixedValue) / (vehicle1Coefficient - vehicle2Coefficient)

  let maxVehicle: Vehicle
  let minVehicle: Vehicle
  if (threshold > 0) {
    maxVehicle = vehicle1FixedValue > vehicle2FixedValue ? vehicle2 : vehicle1
    minVehicle = vehicle1FixedValue < vehicle2FixedValue ? vehicle2 : vehicle1
  } else {
    maxVehicle = vehicle1FixedValue > vehicle2FixedValue ? vehicle1 : vehicle2
    minVehicle = vehicle1FixedValue < vehicle2FixedValue ? vehicle1 : vehicle2
  }

  return <div
    style={props.style} className={props.className}>
    <Paragraph>
      {threshold < 0 ?
        <span>
          {`A ${minVehicle.name} is `}
          <strong>always better</strong>{` for the environment than a ${maxVehicle.name}.`}
        </span>
        :
        <span>
          {`A ${minVehicle.name} starts to be better for the climate than a ${maxVehicle.name} after `}
          <strong>{`${Math.round(threshold).toLocaleString()} km`}</strong>.
        </span>
      }
    </Paragraph>

    <div className='relative'>
      <Line
        className='mx-auto'
        style={{
          width: isBigScreen ? '600px' : '280px',
          height: '300px'
        }}
        options={options} data={data} />
    </div>
  </div >
}

