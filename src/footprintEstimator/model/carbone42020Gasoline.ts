import { VehicleFootprintModel } from "../vehicleFootprintModel";

export class Carbone42020Gasoline implements VehicleFootprintModel {
  productionkgCO2PerKg = 5.2
  endOfLifekgCO2PerKg = 0.4
}