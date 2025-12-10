import { Typography } from 'antd';
import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Scale, Tick, Title,
  Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSSProperties } from 'react';
import { Bar } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';
import { Country } from '../../db/country';
import { Vehicle } from '../../db/vehicleTypes';
import { FootprintEstimator } from '../../footprintEstimator/footprintEstimator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export function BarChart(props: {
  className?: string, style?: CSSProperties,
  totalDistanceKm: number,
  country: Country, vehicles: Vehicle[]
}) {
  const { country, vehicles, totalDistanceKm } = props

  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' }) // sm

  const { Paragraph } = Typography

  const footprintEstimator = new FootprintEstimator()
  const { footprints, minUsageFootprint, maxUsageFootprint, usageRatio } = footprintEstimator.computeEmissions({
    vehicles, totalDistanceKm, country
  })

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (scale: Scale, tickValue: number | string, index: number, ticks: Tick[]) => {
            return isBigScreen
              ? footprints[tickValue as number].name.split(/(?=\()/) // Put "(XX Segment)" on another line
              : ''
          }
        } as any
      },
      y: {
        stacked: true,
        min: 0,
        max: Math.max(50, ...footprints.map(f => Math.ceil(f.footprint.totalKgCO2e / 10000) * 10)) + 10,
        title: {
          display: true,
          text: 'Emissions of the vehicle (tCO2e)'
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          beforeBody: (context: any) => {
            const footprint = footprints[context[0].dataIndex]
            const totalEmissionstCO2e = footprint.footprint.totalKgCO2e / 1000
            return `Total emissions of the vehicle: ${(Math.round(totalEmissionstCO2e * 10) / 10).toLocaleString()} tCO2e`
          },
          label: function (context: any) {
            return `${context.dataset.label}: ${Math.round(context.parsed.y).toLocaleString()} tCO2e`
          }
        }
      },
      legend: {
        display: true,
        position: isBigScreen ? 'right' : 'bottom',
        maxWidth: 400
      },
      datalabels: {
        formatter: (value: any, ctx: {
          datasetIndex: number,
          dataIndex: number,
          chart: {
            data: {
              datasets: {
                data: number[]
              }[]
            }
          }
        }) => {
          let datasets = ctx.chart.data.datasets
          if (ctx.datasetIndex === datasets.length - 1) {
            const totalValue = datasets.map(dataset => dataset.data[ctx.dataIndex])
              .reduce((a, b) => a + b, 0)
            return `${totalValue.toPrecision(3).toLocaleString()} tCO2e`
          }
          else {
            return '';
          }

        },
        anchor: 'end',
        align: 'end'
      }
    } as any
  };

  const labels = footprints.map(fp => fp.name)
  const ids = footprints.map(fp => fp.name)

  const productionData = footprints.map(fp => fp.footprint.productionWithoutBatteryKgCO2e / 1000)
  const batteryProductionData = footprints.map(fp => fp.footprint.batteryProductionKgCO2e / 1000)
  const usageData = footprints.map(fp => fp.footprint.usageKgCO2e / 1000)
  const endOfLifeData = footprints.map(fp => fp.footprint.endOfLifeKgCO2e / 1000)

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

  return <div
    style={props.style} className={props.className}>

    {!isNaN(usageRatio) &&
      <Paragraph>
        <span className=''>
          {`A ${minUsageFootprint.name} emits `}
          <strong>{`${usageRatio.toPrecision(2)}x less CO2`}</strong>
          {` during its usage phase than a ${maxUsageFootprint.name}.`}
        </span>
      </Paragraph>
    }
    <div className='relative'>
      {/* https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note */}
      <Bar
        plugins={[ChartDataLabels]}
        className='mx-auto'
        style={{
          width: isBigScreen ? '600px' : '280px',
          height: '300px'
        }}
        options={options} data={data} />
    </div>
  </div>
}

