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
    id: 'light-gasoline-e95',
    name: 'Light Gasoline E95 Car',
    weightUnladenKg: 950,
    combinedConsumptionWLTPLper100km: 5,
    energy: Energy.Gasoline
  },
  {
    id: 'gasoline-e95',
    name: 'Typical Gasoline E95 Car',
    weightUnladenKg: 1600,
    combinedConsumptionWLTPLper100km: 7,
    energy: Energy.Gasoline
  },
  {
    id: 'bmw-x5',
    name: 'BMW X5 xDrive40i',
    weightUnladenKg: 2175,
    combinedConsumptionWLTPLper100km: 8.9,
    energy: Energy.Gasoline
  },
  {
    id: 'dacia-spring-electric',
    name: 'Dacia Spring Electric',
    weightUnladenKg: 950,
    batteryCapacitykWh: 26.8,
    rangeWLTPKm: 225,
    energy: Energy.Electricity
  },
  {
    id: 'electric-car',
    name: 'Typical Electric Car',
    weightUnladenKg: 1800,
    batteryCapacitykWh: 55,
    rangeWLTPKm: 350,
    energy: Energy.Electricity
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
  }
]