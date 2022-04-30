import { Spin } from "antd"
import React, { useEffect, useState } from "react"
import { parseAllVehicles, Vehicle } from "../db/vehicle"

export interface VehicleProviderInterface {
  allVehicles: Vehicle[]
}
export const VehicleContext = React.createContext<VehicleProviderInterface>({ allVehicles: [] })

export function VehicleProvider(props: { children: React.ReactNode }) {
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>()

  useEffect(() => {
    if (allVehicles) { return }

    parseAllVehicles().then(vehicles => setAllVehicles(vehicles))
  })

  if (!allVehicles) {
    return <Spin />
  }
  return (
    <VehicleContext.Provider value={{ allVehicles }}>
      {props.children}
    </ VehicleContext.Provider>
  )
}
