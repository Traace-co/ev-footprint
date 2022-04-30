import React, { useContext } from "react"
import { Country } from "../db/country"
import { VehicleContext } from "../db/VehicleProvider"
import { Footprint, FootprintEstimator } from "./footprintEstimator"

export interface NamedFootprint {
  name: string
  footprint: Footprint
}

export interface FootprintProviderInterface {
  footprints: NamedFootprint[]
  maxFootprint: NamedFootprint, minFootprint: NamedFootprint,
  maxUsageFootprint: NamedFootprint, minUsageFootprint: NamedFootprint,
  ratio: number, usageRatio: number
}
export const FootprintContext = React.createContext<FootprintProviderInterface | undefined>(undefined)

export function FootprintProvider(props: {
  children: React.ReactNode, totalDistanceKm: number, country: Country,
  vehicle1Id: string, vehicle2Id: string
}) {
  const { totalDistanceKm, country, vehicle1Id, vehicle2Id } = props

  const { allVehicles } = useContext(VehicleContext)

  const estimate = new FootprintEstimator().computeEmissions({
    vehicles: allVehicles.filter(v => v.id === vehicle1Id || v.id === vehicle2Id), totalDistanceKm, country
  })

  return (
    <FootprintContext.Provider value={estimate}>
      {props.children}
    </ FootprintContext.Provider>
  )
}
