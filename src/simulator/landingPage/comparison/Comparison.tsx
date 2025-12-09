'use client'

import { secondaryBackgroundColor } from "@/components/design/colors"
import { Parameter } from "@/components/design/Parameter"
import { StickyCollapse } from "@/utils/StickyCollapse"
import { VehicleTitle } from "@/utils/VehicleTitle"
import { InfoCircleTwoTone } from "@ant-design/icons"
import { Select, Slider, Tooltip } from "antd"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { ClassType } from "../../db/classType"
import { allCountries, Country } from "../../db/country"
import { Vehicle } from "../../db/vehicle"
import { VehicleContext } from "../../db/VehicleProvider"
import { FootprintContext, FootprintProvider } from "../../footprintEstimator/FootprintProvider"
import headerIcon3Img from '../headerIcon3.svg'
import { SimulatorSection } from "../SimulatorSection"
import { BarChart } from "./BarChart"
import bubble1Img from './bubble1.svg'
import bubble2Img from './bubble2.svg'
import bubble3Img from './bubble3.svg'
import { LineChart } from "./LineChart"

const headerIcon3 = headerIcon3Img.src
const bubble1 = bubble1Img.src
const bubble2 = bubble2Img.src
const bubble3 = bubble3Img.src

function CountryOption(props: { country: Country }) {
  const { country: { name, emoji } } = props
  return <div>{`${emoji} ${name}`}</div>
}

function isLanguageCompatible(params: { language: string, countryCode: string }) {
  const { language, countryCode } = params
  return language.toLocaleLowerCase().includes(countryCode)
}

function autoDetectCountryCode() {
  const languages = navigator.languages
  for (const language of languages) {
    const country = allCountries.find(c => isLanguageCompatible({ language, countryCode: c.id }))
    if (country) {
      return country.id
    }
  }
  return 'eu'
}

const DEFAULT_VEHICLE1 = 'gasoline-e95'
const DEFAULT_VEHICLE2 = 'electric-car'

interface ComparisonProps {
  initialVehicle1Id?: string;
  initialVehicle2Id?: string;
}

export function Comparison({
  initialVehicle1Id = DEFAULT_VEHICLE1,
  initialVehicle2Id = DEFAULT_VEHICLE2
}: ComparisonProps = {}) {
  const router = useRouter()
  const { allVehicles } = useContext(VehicleContext)

  const [countryId, setCountryId] = useState(autoDetectCountryCode)
  const [vehicle1Id, setVehicle1Id] = useState(initialVehicle1Id)
  const [vehicle2Id, setVehicle2Id] = useState(initialVehicle2Id)
  const [totalDistanceKm, setTotalDistanceKm] = useState(200000)

  const country = allCountries.find(c => countryId === c.id)

  function navigateToComparison(v1: string, v2: string) {
    router.push(`/compare/${v1}/${v2}/`)
  }

  function classTypeName(classType: ClassType) {
    switch (classType) {
      case ClassType.Light: return 'Light'
      case ClassType.Regular: return 'Regular'
      case ClassType.Heavy: return 'Heavy'
      default: return ''
    }
  }

  function vehiclesForClassType(classType: ClassType, allVehicles: Vehicle[]) {
    return allVehicles.filter(vehicle => {
      switch (classType) {
        case ClassType.Light:
          return vehicle.weightUnladenKg < 1500
        case ClassType.Regular:
          return vehicle.weightUnladenKg >= 1500 && vehicle.weightUnladenKg < 2000
        case ClassType.Heavy:
          return vehicle.weightUnladenKg >= 2000
        default: return false
      }
    })
  }

  if (!country) {
    console.error('Unable to find country with ID=' + countryId)
    return null
  }
  return <FootprintProvider
    totalDistanceKm={totalDistanceKm} country={country}
    vehicle1Id={vehicle1Id} vehicle2Id={vehicle2Id}>
    <div className="flex flex-col items-center w-full">
      <div className="w-full" style={{ minWidth: '300px' }}>
        <StickyCollapse>
          <div className="flex flex-col gap-2 rounded-md p-4 text-xl backdrop-blur" style={{ backgroundColor: secondaryBackgroundColor }}>
            <div className="flex flex-wrap gap-2">
              {[
                { title: 'Car #1', value: vehicle1Id, onChange: (v: string) => { setVehicle1Id(v); navigateToComparison(v, vehicle2Id); } },
                { title: 'Car #2', value: vehicle2Id, onChange: (v: string) => { setVehicle2Id(v); navigateToComparison(vehicle1Id, v); } }
              ].map((parameter, idx) => (
                <Parameter title={parameter.title} key={idx}>
                  <Select
                    className="w-full"
                    value={parameter.value}
                    onChange={parameter.onChange}
                  >
                    {
                      [ClassType.Light, ClassType.Regular, ClassType.Heavy].map(classType => (
                        <Select.OptGroup label={classTypeName(classType)} key={classType}>
                          {vehiclesForClassType(classType, allVehicles).map(vehicle => {
                            const disabled = vehicle.id === (idx === 0 ? vehicle2Id : vehicle1Id)
                            return <Select.Option value={vehicle.id} key={vehicle.id}
                              disabled={disabled}>
                              <VehicleTitle vehicle={vehicle} />
                            </Select.Option>
                          })}
                        </Select.OptGroup>)
                      )
                    }
                  </Select>
                </Parameter>
              ))}
            </div>
            <Parameter title='Country'>
              <div className="flex flew-row items-center gap-2 w-full">
                <Select
                  style={{ width: '200px' }}
                  value={country.id}
                  onChange={setCountryId}
                >
                  {
                    allCountries.map(country => <Select.Option value={country.id} key={country.id}>
                      <CountryOption country={country} />
                    </Select.Option>)
                  }
                </Select>
                <Tooltip title={<div className="text-xs italic">
                  Some countries have a cleaner electricity mix than others. This will impact the emissions of an electric car.
                </div>}>
                  <InfoCircleTwoTone />
                </Tooltip>
              </div>
            </Parameter>
            <Parameter title='Total distance over lifetime of the vehicle (km)'>
              <div className="flex flex-row gap-2 w-full items-center">
                <Slider
                  className="flex-grow"
                  min={0}
                  max={500000}
                  step={10000}
                  defaultValue={totalDistanceKm}
                  onChange={event => setTotalDistanceKm(event)}
                />
                <div className="flex flex-row gap-1">
                  <div>{`${totalDistanceKm.toLocaleString()}`}</div>
                  <span>km</span>
                </div>
              </div>
            </Parameter>
          </div>
        </StickyCollapse>
        <ComparisonDisplay
          totalDistanceKm={totalDistanceKm} country={country}
          vehicle1Id={vehicle1Id} vehicle2Id={vehicle2Id} />
      </div>
    </div>
  </FootprintProvider>
}

function ComparisonDisplay(props: { totalDistanceKm: number, vehicle1Id: string, vehicle2Id: string, country: Country }) {
  const { totalDistanceKm, vehicle1Id, vehicle2Id, country } = props
  const footprintContext = useContext(FootprintContext)

  const { allVehicles } = useContext(VehicleContext)

  if (!footprintContext) { return null } // Should not happen

  const { minFootprint, maxFootprint, ratio } = footprintContext

  const vehicle1 = allVehicles.find(vehicle => vehicle.id === vehicle1Id)!
  const vehicle2 = allVehicles.find(vehicle => vehicle.id === vehicle2Id)!


  return <>
    <SimulatorSection
      level={2}
      icon={headerIcon3}
      title="Comparison results">
      <div>
        <div className='flex flex-row items-center gap-8 pb-8'>
          <div className='text-3xl font-medium'>
            <BackgroundTitle title={`${ratio.toPrecision(2)}x`} icon={bubble1} />
          </div>
          <div className='py-4'>
            <div>
              {`At the end of their life (${totalDistanceKm.toLocaleString()} km), a ${minFootprint.name}`}
            </div>
            <div>
              will have emitted <strong>{`${ratio.toPrecision(2)}x less CO2`}</strong>{` than a ${maxFootprint.name}.`}
            </div>
          </div>
        </div>
        <SimulatorSection
          level={3}
          title={<BackgroundTitle title={'Breakdown of emissions'} icon={bubble2} />}>
          <BarChart
            totalDistanceKm={totalDistanceKm}
            country={country}
            vehicles={[vehicle1, vehicle2]} />
        </SimulatorSection>
        <SimulatorSection
          level={3}
          title={<BackgroundTitle title={'Emissions over time'} icon={bubble3} />}>
          <LineChart
            country={country}
            vehicles={[vehicle1, vehicle2]} />
        </SimulatorSection>
      </div>
    </SimulatorSection >
  </>
}

function BackgroundTitle(props: { title: string, icon?: string }) {
  const { title, icon } = props
  return <div className="relative flex">
    {icon &&
      <div className="absolute -bottom-2 left-0">
        <img src={icon} alt='' />
      </div>
    }
    <div className="z-10">
      {title}
    </div>
  </div>
}