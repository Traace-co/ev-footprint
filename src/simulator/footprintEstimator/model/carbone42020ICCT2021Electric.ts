import { VehicleFootprintModel } from "../vehicleFootprintModel";

// Combination of the ICarbone 4 stufy
export class Carbone42020ICCT2021Electric implements VehicleFootprintModel {
  productionkgCO2PerKg = 4.8
  endOfLifekgCO2PerKg = 0.4
  kgCO2BatteryPerKWh = 60
}