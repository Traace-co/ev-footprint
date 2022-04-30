import { RangeInput, Select } from "grommet"
import { useState } from "react"
import { Country } from "../db/country"
import { allVehicles } from "../db/vehicle"
import { FootprintEstimator } from "../footprintEstimator/footprintEstimator"
import { BarChart } from "./BarChart"

export function Comparison() {
  const [totalDistanceKm, setTotalDistance] = useState(200000)
  const [country, setCountry] = useState<Country>(Country.France)

  const footprintEstimator = new FootprintEstimator()
  const footprints = [{
    name: 'Conventional vehicle',
    footprint: footprintEstimator.conventionalVehicleFootprint({ totalDistanceKm })
  }]
  footprints.push(...allVehicles.map(vehicle => (
    {
      name: vehicle.name,
      footprint: footprintEstimator.estimate({ vehicle, totalDistanceKm, country })
    }
  )))

  function CountryOption(props: { country: Country }) {
    function countryName() {
      switch (props.country) {
        case Country.France: return '🇫🇷 France'
        case Country.Germany: return '🇩🇪 Germany'
      }
    }
    return <div>{countryName()}</div>
  }

  function Parameter(props: { title: string, children: React.ReactNode }) {
    return <div className="flex flex-row gap-2">
      <div>
        {props.title}
      </div>
      <div>
        {props.children}
      </div>
    </div>
  }

  return <div className="flex flex-col text-left">
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">
        Parameters
      </h2>
      <div className="flex flex-col gap-2">
        <Parameter title='Country'>
          <Select
            options={[Country.France, Country.Germany]}
            value={country}
            valueLabel={value => <CountryOption country={value} />}
            onChange={({ option }) => setCountry(option)}
          >
            {(option, state) => (
              <CountryOption country={option} />
            )}
          </Select>
        </Parameter>
        <Parameter title='Total distance (km)'>
          <div className="flex flex-row gap-2">
            <RangeInput
              value={totalDistanceKm}
              min={50000}
              max={500000}
              step={10000}
              onChange={event => setTotalDistance(parseInt(event.target.value))}
            />
            <div className="flex flex-row gap-1">
              <div>{totalDistanceKm}</div>
              <span>km</span>
            </div>
          </div>
        </Parameter>
      </div>
    </div>
    <BarChart footprints={footprints} />
  </div >
}