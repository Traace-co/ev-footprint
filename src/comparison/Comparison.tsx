import { Select, Typography } from "antd"
import React, { ReactNode } from "react"
import { useSearchParams } from "react-router-dom"
import { ClassType } from "../db/classType"
import { Country } from "../db/country"
import { allVehicles } from "../db/vehicle"
import { Parameter } from "../design/Parameter"
import { BarChart } from "./BarChart"
import { LineChart } from "./LineChart"

function ComparisonSection(props: { title: string, children: ReactNode }) {
  const { Title } = Typography

  return <div className="w-full">
    <Title level={2}>{props.title}</Title>
    {props.children}
  </div>
}

function CountryOption(props: { country: Country }) {
  function countryName() {
    switch (props.country) {
      case Country.France: return '🇫🇷 France'
      case Country.Germany: return '🇩🇪 Germany'
    }
  }
  return <div>{countryName()}</div>
}

export function Comparison() {
  const [searchParams, setSearchParams] = useSearchParams()

  const countryKey = 'country'
  const country = searchParams.get(countryKey) as Country ?? Country.France

  const vehicle1Key = 'vehicle1'
  const vehicle1Id = searchParams.get(vehicle1Key) ?? 'gasoline-e95'

  const vehicle2Key = 'vehicle2'
  const vehicle2Id = searchParams.get(vehicle2Key) ?? 'electric-car'

  const vehicle1 = allVehicles.find(vehicle => vehicle.id === vehicle1Id)!
  const vehicle2 = allVehicles.find(vehicle => vehicle.id === vehicle2Id)!

  function classTypeName(classType: ClassType) {
    switch (classType) {
      case ClassType.Light: return 'Light'
      case ClassType.Regular: return 'Regular'
      case ClassType.Heavy: return 'Heavy'
      default: return ''
    }
  }

  function vehiclesForClassType(classType: ClassType) {
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

  return <div className="flex flex-col items-center w-full">
    <div style={{ width: '600px' }}>

      <div className="mb-4 sticky top-0 backdrop-blur p-4">
        <h2 className="text-xl font-medium mb-4">
          Select your car
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {[{ title: 'Car #1', key: vehicle1Key, value: vehicle1Id },
          { title: 'Car #2', key: vehicle2Key, value: vehicle2Id }
          ].map(parameter => (
            <Parameter title={parameter.title}>
              <Select
                style={{ width: '200px' }}
                value={parameter.value}
                onChange={option => {
                  searchParams.set(parameter.key, option)
                  setSearchParams(searchParams)
                }
                }
              >
                {
                  [ClassType.Light, ClassType.Regular, ClassType.Heavy].map(classType => (
                    <Select.OptGroup label={classTypeName(classType)}>
                      {vehiclesForClassType(classType).map(vehicle => (
                        <Select.Option value={vehicle.id} key={vehicle.id}>
                          {vehicle.name}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>)
                  )
                }
              </Select>
            </Parameter>
          ))}
          <div className="col-span-2 space-y-1">
            <Parameter title='Country'>
              <Select
                style={{ width: '150px' }}
                value={country}
                onChange={option => {
                  searchParams.set(countryKey, option)
                  setSearchParams(searchParams)
                }
                }
              >
                {
                  [Country.France, Country.Germany].map(option => <Select.Option value={option} key={option}>
                    <CountryOption country={option} />
                  </Select.Option>)
                }
              </Select>
            </Parameter>

            <div className="text-xs italic">
              Some countries have a cleaner electricity mix than others. This will impact the emissions of an electric car.
            </div>
          </div>
        </div>
      </div>
      <ComparisonSection
        title="Production vs Usage">
        <BarChart
          country={country}
          vehicles={[vehicle1, vehicle2]} />
      </ComparisonSection>
      <ComparisonSection
        title="Emissions over time">
        <LineChart
          country={country}
          vehicles={[vehicle1, vehicle2]} />
      </ComparisonSection>
    </div >
  </div>
}