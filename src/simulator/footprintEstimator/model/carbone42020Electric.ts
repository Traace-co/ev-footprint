import { VehicleFootprintModel } from "../vehicleFootprintModel";

export class Carbone42020Electric implements VehicleFootprintModel {
  productionkgCO2PerKg = 4.8
  endOfLifekgCO2PerKg = 0.4
  kgCO2BatteryPerKWh = 101
}