import { Country } from "../db/country"
import { Vehicle } from "../db/vehicle"

export interface Footprint {
  productionKgCO2e: number
  usageKgCO2e: number
}

export class FootprintEstimator {
  get conventionalVehicleFootprint() {
    return {
      productionKgCO2e: 3740,
      usageKgCO2e: 18260
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

  estimate(params: { vehicle: Vehicle, totalDistanceKm: number, country: Country }): Footprint {
    const { vehicle, totalDistanceKm } = params

    // ADEME 90511:
    // 1100 kg B-segment EV, 24kWh battery, 150 km range
    // Battery production: 3150 kgCO2e
    // Other components production: 3060 kgCO2e
    // Assembling: 360 kgCO2e

    const kgCO2PerKg = (3150 + 3060 + 360) / 1100

    const efficiency = vehicle.batteryCapacitykWh / vehicle.rangeWLTPKm

    return {
      productionKgCO2e: Math.round(kgCO2PerKg * vehicle.weightUnladenKg),
      usageKgCO2e: Math.round(this.countryKgCO2PerKWh(params.country) * efficiency * totalDistanceKm)
    }
  }
}