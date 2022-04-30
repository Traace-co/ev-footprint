import { Country } from "../db/country"
import { allVehicles } from "../db/vehicle"
import { FootprintEstimator } from "../footprintEstimator/footprintEstimator"
import { BarChart } from "./BarChart"

export function Comparison(props: { totalDistanceKm: number, country: Country }) {
  const { totalDistanceKm, country } = props
  const footprintEstimator = new FootprintEstimator()
  const footprints = [{
    name: 'Conventional vehicle',
    footprint: footprintEstimator.conventionalVehicleFootprint
  }]
  footprints.push(...allVehicles.map(vehicle => (
    {
      name: vehicle.name,
      footprint: footprintEstimator.estimate({ vehicle, totalDistanceKm, country })
    }
  )))
  return <div>
    {/* <div>
      {footprints.map(footprintWithVehicle => {

        const { name, footprint } = footprintWithVehicle
        return <div key={name}>
          <div className="font-bold">
            {name}
          </div>
          <div>
            <div>Production: {footprint.productionKgCO2e} kgCO2e</div>
            <div>Usage: {footprint.usageKgCO2e} kgCO2e</div>
          </div>
        </div>
      })}
    </div> */}
    <BarChart footprints={footprints} />
  </div>
}