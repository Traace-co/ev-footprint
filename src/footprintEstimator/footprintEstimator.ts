import { Country } from "../db/country"
import { Energy, Vehicle } from "../db/vehicle"
import { Carbone4Electric2020 } from "./model/carbone4Electric2020"
import { Carbone4Gasoline2020 } from "./model/carbone4Gasoline2020"
import { VehicleFootprintModel } from "./vehicleFootprintModel"

export interface Footprint {
  productionKgCO2e: number
  usageKgCO2e: number
}

export class FootprintEstimator {
  conventionalVehicleFootprint(params: { totalDistanceKm: number }) {
    const { totalDistanceKm } = params

    // Carbone 4 2020
    const kgCO2VehiclePerKg = 5.2 + 0.4

    const weightUnladenKg = 1600

    return {
      productionKgCO2e: Math.round(kgCO2VehiclePerKg * weightUnladenKg),
      usageKgCO2e: Math.round(15840 / 150000 * totalDistanceKm)
    }
    return {
      productionKgCO2e: 3740,
      usageKgCO2e: 15840 / 150000 * totalDistanceKm
    }
  }

  countryKgCO2PerKWh(country: Country): number {
    // Source GaBi Professional (from ADEME 90511)
    switch (country) {
      case Country.Germany:
        return 0.623
      case Country.France:
        return 0.11
      default:
        throw new Error(`Unknown country: ${country}`)
    }
  }

  computeUsageKgCO2e(params: { vehicle: Vehicle, totalDistanceKm: number, country: Country }): number {
    const { vehicle, totalDistanceKm, country } = params
    switch (vehicle.energy) {
      case Energy.Electricity:
        if (!vehicle.batteryCapacitykWh || !vehicle.rangeWLTPKm) {
          throw new Error('An electric vehicle must have its battery capacity and range defined!')
        }
        const efficiency = vehicle.batteryCapacitykWh / vehicle.rangeWLTPKm
        return this.countryKgCO2PerKWh(country) * efficiency * totalDistanceKm
      case Energy.Diesel:
      case Energy.Gasoline:
        return 0
    }
  }

  estimate(params: { vehicle: Vehicle, totalDistanceKm: number, country: Country }): Footprint {
    const { vehicle } = params

    const model: VehicleFootprintModel = vehicle.energy === Energy.Electricity
      ? new Carbone4Electric2020()
      : new Carbone4Gasoline2020()

    const kgCO2VehiclePerKg = model.productionkgCO2PerKg + model.endOfLifekgCO2PerKg

    let productionKgCO2e = kgCO2VehiclePerKg * vehicle.weightUnladenKg
    if (model.kgCO2BatteryPerKWh && vehicle.batteryCapacitykWh) {
      productionKgCO2e += model.kgCO2BatteryPerKWh * vehicle.batteryCapacitykWh
    }

    return {
      productionKgCO2e: Math.round(productionKgCO2e),
      usageKgCO2e: Math.round(this.computeUsageKgCO2e(params))
    }
  }
}