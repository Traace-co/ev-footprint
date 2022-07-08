import { Slider, Typography } from 'antd';
import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import { CSSProperties, useState } from 'react';
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
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        min: 0,
        max: Math.max(60000, ...footprints.map(f => Math.ceil(f.footprint.totalKgCO2e / 10000) * 10000)),
        title: {
          display: true,
          text: 'Emissions of the vehicle (kgCO2e)'
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          beforeBody: (context: any) => {
            const footprint = footprints[context[0].dataIndex]
            const totalEmissions = footprint.footprint.totalKgCO2e
            return `Total emissions of the vehicle: ${Math.round(totalEmissions).toLocaleString()} kgCO2e`
          },
          label: function (context: any) {
            return `${context.dataset.label}: ${Math.round(context.parsed.y).toLocaleString()} kgCO2e`
          }
        }
      },
      legend: {
        display: false
      }
    }
  };

  const labels = footprints.map(fp => fp.name)
  const ids = footprints.map(fp => fp.name)

  const productionData = footprints.map(fp => fp.footprint.productionWithoutBatteryKgCO2e)
  const batteryProductionData = footprints.map(fp => fp.footprint.batteryProductionKgCO2e)
  const usageData = footprints.map(fp => fp.footprint.usageKgCO2e)
  const endOfLifeData = footprints.map(fp => fp.footprint.endOfLifeKgCO2e)

  const data = {
    labels,
    ids,
    datasets: [
      {
        label: 'Production (without battery)',
        data: productionData,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Battery production',
        data: batteryProductionData,
        backgroundColor: 'rgb(255, 160, 190)',
      },
      {
        label: 'Usage',
        data: usageData,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'End of life',
        data: endOfLifeData,
        backgroundColor: 'rgb(150, 11, 190)',
      }
    ]
  }

  const maxFootprint = footprints.reduce((a, b) => a.footprint.totalKgCO2e < b.footprint.totalKgCO2e ? b : a)
  const minFootprint = footprints.reduce((a, b) => a.footprint.totalKgCO2e < b.footprint.totalKgCO2e ? a : b)
  const ratio = maxFootprint.footprint.totalKgCO2e / minFootprint.footprint.totalKgCO2e

  const maxUsageFootprint = footprints.reduce((a, b) => a.footprint.usageKgCO2e < b.footprint.usageKgCO2e ? b : a)
  const minUsageFootprint = footprints.reduce((a, b) => a.footprint.usageKgCO2e < b.footprint.usageKgCO2e ? a : b)
  const usageRatio = maxUsageFootprint.footprint.usageKgCO2e / minUsageFootprint.footprint.usageKgCO2e


  return <div
    style={props.style} className={props.className}>

    <Typography.Paragraph>
      ✅ <span className='italic'>
        {`At the end of their life (${totalDistanceKm.toLocaleString()} km), a ${minFootprint.name} will have emitted `}
        <strong>{`${ratio.toPrecision(2)}x`}</strong>{` less CO2 than a ${maxFootprint.name}.`}
      </span>
    </Typography.Paragraph>

    <Typography.Paragraph>
      ✅ <span className='italic'>
        {`A ${minUsageFootprint.name} emits `}
        <strong>{`${usageRatio.toPrecision(2)}x`}</strong>
        {` less CO2 during its usage phase than a ${maxFootprint.name}.`}
      </span>
    </Typography.Paragraph>
    <Parameter title='Total distance (km)'>
      <div className="flex flex-row gap-2 w-full">
        <Slider
          className="flex-grow"
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
      className='mx-auto'
      style={{ width: '500px' }}
      options={options} data={data} />
  </div>
}

