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

function ClassTypeOption(props: { classType: ClassType }) {
  function classTypeName() {
    switch (props.classType) {
      case ClassType.Light: return 'Light'
      case ClassType.Regular: return 'Regular'
      case ClassType.Heavy: return 'Heavy'
      case ClassType.All: return 'All'
      default: return ''
    }
  }
  return <div>{classTypeName()}</div>
}

export function Comparison() {
  const [searchParams, setSearchParams] = useSearchParams()

  const countryKey = 'country'
  const country = searchParams.get(countryKey) as Country ?? Country.France

  const classTypeKey = 'classType'
  const classType = searchParams.get(classTypeKey) as ClassType ?? ClassType.Regular

  const vehicles = allVehicles.filter(vehicle => {
    switch (classType) {
      case ClassType.Light:
        return vehicle.weightUnladenKg < 1500
      case ClassType.Regular:
        return vehicle.weightUnladenKg >= 1500 && vehicle.weightUnladenKg < 2000
      case ClassType.Heavy:
        return vehicle.weightUnladenKg >= 2000
      case ClassType.All: return true
      default: return false
    }
  })


  return <div className="flex flex-col items-center w-full">
    <div style={{ width: '600px' }}>

      <div className="mb-4 sticky top-0 backdrop-blur p-4">
        <h2 className="text-xl font-medium mb-4">
          Parameters
        </h2>
        <div className="flex flex-wrap gap-2">
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
          <Parameter title='Class'>
            <Select
              style={{ width: '150px' }}
              value={classType}
              onChange={option => {
                searchParams.set(classTypeKey, option)
                setSearchParams(searchParams)
              }
              }
            >
              {
                [ClassType.All, ClassType.Light, ClassType.Regular, ClassType.Heavy].map(option => (
                  <Select.Option value={option} key={option}>
                    <ClassTypeOption classType={option} />
                  </Select.Option>)
                )
              }
            </Select>
          </Parameter>
        </div>
      </div>
      <ComparisonSection
        title="Production vs Usage">
        <BarChart
          country={country}
          vehicles={vehicles} />
      </ComparisonSection>
      <ComparisonSection
        title="Emissions over time">
        <LineChart
          country={country}
          vehicles={vehicles} />
      </ComparisonSection>
    </div >
  </div>
}