import { Select, Typography } from "antd"
import React, { ReactNode, useState } from "react"
import { Country } from "../db/country"
import { allVehicles } from "../db/vehicle"
import { Parameter } from "../design/Parameter"
import { BarChart } from "./BarChart"
import { LineChart } from "./LineChart"

function ComparisonSection(props: { title: string, children: ReactNode }) {
  const { Title } = Typography

  return <div>
    <Title level={2}>{props.title}</Title>
    {props.children}
  </div>
}

export function Comparison() {
  const [country, setCountry] = useState<Country>(Country.France)

  function CountryOption(props: { country: Country }) {
    function countryName() {
      switch (props.country) {
        case Country.France: return '🇫🇷 France'
        case Country.Germany: return '🇩🇪 Germany'
      }
    }
    return <div>{countryName()}</div>
  }

  return <div className="flex flex-col text-left">
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">
        Parameters
      </h2>
      <div className="flex flex-col gap-2">
        <Parameter title='Country'>
          <Select
            value={country}
            onChange={option => setCountry(option)}
          >
            {
              [Country.France, Country.Germany].map(option => <Select.Option value={option} key={option}>
                <CountryOption country={option} />
              </Select.Option>)
            }
          </Select>
        </Parameter>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <ComparisonSection
        title="Production vs Usage">
        <BarChart
          country={country}
          vehicles={allVehicles} />
      </ComparisonSection>
      <ComparisonSection
        title="Emissions over time">
        <LineChart
          country={country}
          vehicles={allVehicles} />
      </ComparisonSection>
    </div>
  </div >
}