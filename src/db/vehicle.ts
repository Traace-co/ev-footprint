export enum Energy {
  Gasoline = 'Gasoline',
  Diesel = 'Diesel',
  Electricity = 'Electricity'
}

export interface Vehicle {
  id: string
  name: string,
  weightUnladenKg: number,
  batteryCapacitykWh?: number,
  rangeWLTPKm?: number
  combinedConsumptionWLTPLper100km?: number
  energy: Energy
}

export const allVehicles: Vehicle[] = [
  {
    id: 'gasoline-e95',
    name: 'Conventional Gasoline E95 Car',
    weightUnladenKg: 1600,
    combinedConsumptionWLTPLper100km: 8,
    energy: Energy.Gasoline
  },
  {
    id: 'light-gasoline-e95',
    name: 'Light Gasoline E95 Car',
    weightUnladenKg: 950,
    combinedConsumptionWLTPLper100km: 6,
    energy: Energy.Gasoline
  },
  {
    id: 'volvo-xc90',
    name: 'Volvo XC 90 B6 AWD',
    weightUnladenKg: 1953,
    combinedConsumptionWLTPLper100km: 12.5,
    energy: Energy.Gasoline
  },
  {
    id: 'tesla-model-s-long-range',
    name: 'Tesla Model S Long Range',
    weightUnladenKg: 2069,
    batteryCapacitykWh: 100,
    rangeWLTPKm: 652,
    energy: Energy.Electricity
  },
  {
    id: 'tesla-model-x-long-range',
    name: 'Tesla Model X Long Range',
    weightUnladenKg: 2352,
    batteryCapacitykWh: 100,
    rangeWLTPKm: 580,
    energy: Energy.Electricity
  },
  {
    id: 'dacia-spring-electric',
    name: 'Dacia Spring Electric',
    weightUnladenKg: 950,
    batteryCapacitykWh: 26.8,
    rangeWLTPKm: 225,
    energy: Energy.Electricity
  }
]