import { Select, Slider } from "antd"
import React, { useState } from "react"
import { Country } from "../db/country"
import { allVehicles } from "../db/vehicle"
import { FootprintEstimator } from "../footprintEstimator/footprintEstimator"
import { BarChart } from "./BarChart"


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

export function Comparison() {
  const [totalDistanceKm, setTotalDistanceKm] = useState(200000)
  const [country, setCountry] = useState<Country>(Country.France)

  const footprintEstimator = new FootprintEstimator()
  const footprints = allVehicles.map(vehicle => (
    {
      name: vehicle.name,
      footprint: footprintEstimator.estimate({ vehicle, totalDistanceKm, country })
    }
  ))

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
      </div>
    </div>
    <BarChart footprints={footprints} />
  </div >
}