import { Energy } from "../db/vehicle"

export function colorFromEnergy(energy: Energy): string {
  switch (energy) {
    case Energy.Electricity:
      return '#00bfff'
    case Energy.Diesel:
      return '#ffb300'
    case Energy.Gasoline:
      return '#ff0000'
  }
}