import { InfoCircleTwoTone } from "@ant-design/icons"
import { Select, Slider, Tooltip } from "antd"
import { useContext, useState } from "react"
import { Trans } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { secondaryBackgroundColor } from "../../../design/colors"
import { Parameter } from "../../../design/Parameter"
import { StickyCollapse } from "../../../utils/StickyCollapse"
import { useTypedTranslation } from "../../../utils/translation-codegen"
import { VehicleTitle } from "../../../utils/VehicleTitle"
import { ClassType } from "../../db/classType"
import { allCountries, Country } from "../../db/country"
import { Vehicle } from "../../db/vehicle"
import { VehicleContext } from "../../db/VehicleProvider"
import { FootprintContext, FootprintProvider } from "../../footprintEstimator/FootprintProvider"
import headerIcon3 from '../headerIcon3.svg'
import { SimulatorSection } from "../SimulatorSection"
import { BarChart } from "./BarChart"
import bubble1 from './bubble1.svg'
import bubble2 from './bubble2.svg'
import bubble3 from './bubble3.svg'
import { LineChart } from "./LineChart"

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

export function Comparison() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { t } = useTypedTranslation()

  const { allVehicles } = useContext(VehicleContext)

  const countryKey = 'country'
  const countryParam = searchParams.get(countryKey) ?? autoDetectCountryCode()
  const country = allCountries.find(c => countryParam === c.id)

  const vehicle1Key = 'vehicle1'
  const vehicle1Id = searchParams.get(vehicle1Key) ?? 'gasoline-e95'

  const vehicle2Key = 'vehicle2'
  const vehicle2Id = searchParams.get(vehicle2Key) ?? 'electric-car'

  const [totalDistanceKm, setTotalDistanceKm] = useState(200000)



  function classTypeName(classType: ClassType) {
    switch (classType) {
      case ClassType.Light: return t('vehicle.class.light')
      case ClassType.Regular: return t('vehicle.class.regular')
      case ClassType.Heavy: return t('vehicle.class.heavy')
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
    console.error('Unable to find country with ID=' + countryParam)
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
              {[{ title: t('landing_page.settings.car_1'), key: vehicle1Key, value: vehicle1Id },
              { title: t('landing_page.settings.car_2'), key: vehicle2Key, value: vehicle2Id }
              ].map(parameter => (
                <Parameter title={parameter.title} key={parameter.key}>
                  <Select
                    className="w-full"
                    value={parameter.value}
                    onChange={option => {
                      searchParams.set(parameter.key, option)
                      setSearchParams(searchParams)
                    }
                    }
                  >
                    {
                      [ClassType.Light, ClassType.Regular, ClassType.Heavy].map(classType => (
                        <Select.OptGroup label={classTypeName(classType)} key={classType}>
                          {vehiclesForClassType(classType, allVehicles).map(vehicle => {
                            // Prevent comparison of identical vehicles
                            const disabled = vehicle.id === (parameter.key === vehicle1Key ? vehicle2Id : vehicle1Id)
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
            <Parameter title={t('landing_page.settings.country')}>
              <div className="flex flew-row items-center gap-2 w-full">
                <Select
                  style={{ width: '200px' }}
                  value={country.id}
                  onChange={option => {
                    searchParams.set(countryKey, option)
                    setSearchParams(searchParams)
                  }
                  }
                >
                  {
                    allCountries.map(country => <Select.Option value={country.id} key={country.id}>
                      <CountryOption country={country} />
                    </Select.Option>)
                  }
                </Select>
                <Tooltip title={<div className="text-xs italic">
                  {t('landing_page.settings.country_hint')}
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
                  <div>{totalDistanceKm}</div>
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

  const { t } = useTypedTranslation()

  const { allVehicles } = useContext(VehicleContext)

  if (!footprintContext) { return null } // Should not happen

  const { minFootprint, maxFootprint, ratio } = footprintContext

  const vehicle1 = allVehicles.find(vehicle => vehicle.id === vehicle1Id)!
  const vehicle2 = allVehicles.find(vehicle => vehicle.id === vehicle2Id)!

  if (vehicle1 && vehicle2) {
    document.title = `${vehicle1.name} vs ${vehicle2.name}`
  }

  return <>
    <SimulatorSection
      level={2}
      icon={headerIcon3}
      title={t('landing_page.results.title')}>
      <div>
        <div className='flex flex-row items-center gap-8 pb-8'>
          <div className='text-3xl font-medium'>
            <BackgroundTitle title={`${ratio.toPrecision(2)}x`} icon={bubble1} />
          </div>
          <div className='py-4'>
            <div>
              {t('landing_page.results.summary_1', {
                totalDistanceKm: totalDistanceKm.toLocaleString(),
                minFootprintVehicleName: minFootprint.name
              })}
            </div>
            <div>
              <Trans
                i18nKey='landing_page.results.summary_2'
                values={{
                  co2Ratio: ratio.toPrecision(2),
                  maxFootprintVehicleName: maxFootprint.name
                }}
                components={[<strong />]}
              />
            </div>
          </div>
        </div>
        <SimulatorSection
          level={3}
          title={<BackgroundTitle title={t('landing_page.results.breakdown.title')} icon={bubble2} />}>
          <BarChart
            totalDistanceKm={totalDistanceKm}
            country={country}
            vehicles={[vehicle1, vehicle2]} />
        </SimulatorSection>
        <SimulatorSection
          level={3}
          title={<BackgroundTitle title={t('landing_page.results.emissions_over_time.title')} icon={bubble3} />}>
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