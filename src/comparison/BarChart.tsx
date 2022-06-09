import { Slider } from 'antd';
import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import React, { CSSProperties, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Country } from '../db/country';
import { Vehicle } from '../db/vehicle';
import { Parameter } from '../design/Parameter';
import { FootprintEstimator } from '../footprintEstimator/footprintEstimator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function BarChart(props: {
  className?: string, style?: CSSProperties,
  country: Country, vehicles: Vehicle[]
}) {
  const { country, vehicles } = props

  const [totalDistanceKm, setTotalDistanceKm] = useState(200000)

  const footprintEstimator = new FootprintEstimator()
  const footprints = vehicles.map(vehicle => (
    {
      name: vehicle.name,
      footprint: footprintEstimator.estimate({ vehicle, totalDistanceKm, country })
    }
  ))

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 160000,
        title: {
          display: true,
          text: 'Emissions of the vehicle (kgCO2e)'
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          beforeBody: (context: any) => {
            const footprint = footprints[context[0].dataIndex]
            const totalEmissions = footprint.footprint.productionKgCO2e + footprint.footprint.usageKgCO2e
            return `Total emissions of the vehicle: ${totalEmissions.toLocaleString()} kgCO2e`
          }
        }
      }
    }
  };

  const labels = footprints.map(fp => fp.name)
  const ids = footprints.map(fp => fp.name)

  const productionData = footprints.map(fp => fp.footprint.productionKgCO2e)
  const usageData = footprints.map(fp => fp.footprint.usageKgCO2e)

  const data = {
    labels,
    ids,
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

  return <div
    style={props.style} className={props.className}>
    <Parameter title='Total distance (km)'>
      <div className="flex flex-row gap-2">
        <Slider
          className="w-96"
          min={0}
          max={500000}
          step={10000}
          defaultValue={totalDistanceKm}
          onChange={event => setTotalDistanceKm(event)}
        />
        <div className="flex flex-row gap-1">
          <div>{totalDistanceKm}</div>
          <span>km</span>
        </div>
      </div>
    </Parameter>
    <Bar
      options={options} data={data} />
  </div>
}

