import { Country } from "../db/country"
import { Energy, Vehicle } from "../db/vehicle"
import { Carbone4Electric2020 } from "./model/carbone4Electric2020"
import { Carbone4Gasoline2020 } from "./model/carbone4Gasoline2020"
import { VehicleFootprintModel } from "./vehicleFootprintModel"

export interface Footprint {
  productionWithoutBatteryKgCO2e: number
  batteryProductionKgCO2e: number
  endOfLifeKgCO2e: number
  usageKgCO2e: number
  totalKgCO2e: number
}

export class FootprintEstimator {

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
        const emissionFactorkgCO2PerLiter = 2.7
        if (!vehicle.combinedConsumptionWLTPLper100km) {
          throw new Error('A gasoline or diesel vehicle must have its consumption defined!')
        }
        return vehicle.combinedConsumptionWLTPLper100km * emissionFactorkgCO2PerLiter * totalDistanceKm / 100
    }
  }

  estimate(params: { vehicle: Vehicle, totalDistanceKm: number, country: Country }): Footprint {
    const { vehicle } = params

    const model: VehicleFootprintModel = vehicle.energy === Energy.Electricity
      ? new Carbone4Electric2020()
      : new Carbone4Gasoline2020()

    const kgCO2VehiclePerKg = model.productionkgCO2PerKg + model.endOfLifekgCO2PerKg

    let batteryProductionKgCO2e: number
    if (model.kgCO2BatteryPerKWh && vehicle.batteryCapacitykWh) {
      batteryProductionKgCO2e = model.kgCO2BatteryPerKWh * vehicle.batteryCapacitykWh
    } else {
      batteryProductionKgCO2e = 0
    }

    const result = {
      productionWithoutBatteryKgCO2e: Math.round(kgCO2VehiclePerKg * vehicle.weightUnladenKg),
      batteryProductionKgCO2e: Math.round(batteryProductionKgCO2e),
      endOfLifeKgCO2e: Math.round(model.endOfLifekgCO2PerKg * vehicle.weightUnladenKg),
      usageKgCO2e: Math.round(this.computeUsageKgCO2e(params)),
    }
    return {
      ...result,
      totalKgCO2e: result.productionWithoutBatteryKgCO2e + result.batteryProductionKgCO2e + result.endOfLifeKgCO2e + result.usageKgCO2e
    }
  }
}