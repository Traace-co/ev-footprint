export interface Vehicle {
  id: string
  name: string,
  weightUnladenKg: number,
  batteryCapacitykWh: number,
  rangeWLTPKm: number
}

export const allVehicles: Vehicle[] = [
  {
    id: 'tesla-model-s-long-range',
    name: 'Tesla Model S Long Range',
    weightUnladenKg: 2069,
    batteryCapacitykWh: 100,
    rangeWLTPKm: 652
  },
  {
    id: 'tesla-model-x-long-range',
    name: 'Tesla Model X Long Range',
    weightUnladenKg: 2352,
    batteryCapacitykWh: 100,
    rangeWLTPKm: 580
  },
  {
    id: 'dacia-spring-electric',
    name: 'Dacia Spring Electric',
    weightUnladenKg: 950,
    batteryCapacitykWh: 26.8,
    rangeWLTPKm: 225
  }
]