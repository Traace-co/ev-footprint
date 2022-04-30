import { Country } from "../db/country"
import { Energy, Vehicle } from "../db/vehicle"
import { Carbone42020ICCT2021Electric } from "./model/carbone42020ICCT2021Electric"
import { Carbone42020InternalCombustionEngine } from "./model/carbone42020ICE"
import { VehicleFootprintModel } from "./vehicleFootprintModel"

export interface Footprint {
  productionWithoutBatteryKgCO2e: number
  batteryProductionKgCO2e: number
  endOfLifeKgCO2e: number
  usageKgCO2e: number
  totalKgCO2e: number
}

export class FootprintEstimator {
  computeEmissions(params: { vehicles: Vehicle[], totalDistanceKm: number, country: Country }) {
    const { vehicles, totalDistanceKm, country } = params
    const footprints = vehicles.map(vehicle => (
      {
        name: vehicle.name,
        footprint: this.estimate({ vehicle, totalDistanceKm, country })
      }
    ))

    const maxFootprint = footprints.reduce((a, b) => a.footprint.totalKgCO2e < b.footprint.totalKgCO2e ? b : a)
    const minFootprint = footprints.reduce((a, b) => a.footprint.totalKgCO2e < b.footprint.totalKgCO2e ? a : b)
    const ratio = maxFootprint.footprint.totalKgCO2e / minFootprint.footprint.totalKgCO2e

    const maxUsageFootprint = footprints.reduce((a, b) => a.footprint.usageKgCO2e < b.footprint.usageKgCO2e ? b : a)
    const minUsageFootprint = footprints.reduce((a, b) => a.footprint.usageKgCO2e < b.footprint.usageKgCO2e ? a : b)
    const usageRatio = maxUsageFootprint.footprint.usageKgCO2e / minUsageFootprint.footprint.usageKgCO2e

    return {
      footprints,
      maxFootprint, minFootprint,
      maxUsageFootprint, minUsageFootprint,
      ratio, usageRatio
    }
  }

  estimate(params: { vehicle: Vehicle, totalDistanceKm: number, country: Country }): Footprint {
    const { vehicle } = params

    const model: VehicleFootprintModel = vehicle.energy === Energy.Electricity
      ? new Carbone42020ICCT2021Electric()
      : new Carbone42020InternalCombustionEngine()

    const kgCO2VehiclePerKg = model.productionkgCO2PerKg + model.endOfLifekgCO2PerKg

    let batteryProductionKgCO2e: number
    if (model.kgCO2BatteryPerKWh && vehicle.batteryCapacitykWh) {
      batteryProductionKgCO2e = model.kgCO2BatteryPerKWh * vehicle.batteryCapacitykWh
    } else {
      batteryProductionKgCO2e = 0
    }

    const result = {
      productionWithoutBatteryKgCO2e: kgCO2VehiclePerKg * vehicle.weightUnladenKg,
      batteryProductionKgCO2e: batteryProductionKgCO2e,
      endOfLifeKgCO2e: model.endOfLifekgCO2PerKg * vehicle.weightUnladenKg,
      usageKgCO2e: this.computeUsageKgCO2e(params),
    }
    return {
      ...result,
      totalKgCO2e: result.productionWithoutBatteryKgCO2e + result.batteryProductionKgCO2e + result.endOfLifeKgCO2e + result.usageKgCO2e
    }
  }

  private computeUsageKgCO2e(params: { vehicle: Vehicle, totalDistanceKm: number, country: Country }): number {
    const { vehicle, totalDistanceKm, country } = params
    switch (vehicle.energy) {
      case Energy.Electricity:
        if (!vehicle.batteryCapacitykWh || !vehicle.averageRangeKm) {
          throw new Error('An electric vehicle must have its battery capacity and range defined!')
        }
        const efficiency = vehicle.batteryCapacitykWh / vehicle.averageRangeKm
        return country.kgCO2PerKWh * efficiency * totalDistanceKm
      case Energy.Diesel:
      case Energy.Gasoline:
        // Source: Ademe  (https://bilans-ges.ademe.fr/fr/basecarbone/donnees-consulter/liste-element/categorie/405)
        const emissionFactorkgCO2PerLiter = vehicle.energy === Energy.Gasoline
          ? 2.7 // E10
          : 3.1 // Gazole B7
        if (!vehicle.averageConsumptionPer100km) {
          throw new Error('A gasoline or diesel vehicle must have its consumption defined! Error for vehicle ' + JSON.stringify(vehicle) + "consumption: " + vehicle.averageConsumptionPer100km)
        }
        return vehicle.averageConsumptionPer100km * emissionFactorkgCO2PerLiter * totalDistanceKm / 100
    }
  }
}