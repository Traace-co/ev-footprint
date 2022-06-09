import { Select } from "antd"
import React, { useState } from "react"
import { Country } from "../db/country"
import { allVehicles } from "../db/vehicle"
import { Parameter } from "../design/Parameter"
import { BarChart } from "./BarChart"
import { LineChart } from "./LineChart"

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
      <BarChart
        country={country}
        vehicles={allVehicles} />
      <LineChart
        country={country}
        vehicles={allVehicles} />
    </div>
  </div >
}