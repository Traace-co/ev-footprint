import { Energy, Vehicle } from "@/simulator/db/vehicle";
import { parse } from "csv-parse/browser/esm/sync";

// Parse vehicles synchronously from raw CSV string
function parseVehiclesFromCsv(csvString: string): Vehicle[] {
	const records = parse(csvString, {
		columns: true,
		skip_empty_lines: true,
	});
	return records.map((record: any) => ({
		id: record.id,
		name: record.name,
		energy: record.energy as Energy,
		weightUnladenKg: parseFloat(
			record.weightUnladenKg?.replace(",", ".") || "0",
		),
	}));
}

// Static vehicle data for build-time generation
const vehiclesCsv = `id,name,weightUnladenKg,batteryCapacitykWh,averageRangeKm,averageConsumptionPer100km,energy
light-gasoline-e95,Light Gasoline E95 Car (B Segment),1145,,,"6,3",Gasoline
gasoline-e95,Medium Gasoline E95 Car (D Segment),1520,,,"8,3",Gasoline
diesel,Medium Diesel Car (D Segment),1560,,,"6,9",Diesel
large-suv-gasoline-e95,Large Gasoline E95 SUV,2175,,,"12",Gasoline
large-suv-diesel,Large Diesel SUV,2245,,,"9,8",Diesel
electric-car,Medium Electric Car (D Segment),1800,60,"285,7",,Electricity
light-electric-car,Light Electric Car (B Segment),1333,50,"312,5",,Electricity
large-suv-electric-car,Large Electric SUV,2352,100,400,,Electricity`;

export const staticVehicles = parseVehiclesFromCsv(vehiclesCsv);

export interface VehicleCombination {
	vehicle1: string;
	vehicle2: string;
}

export function generateAllCombinations(): VehicleCombination[] {
	const combinations: VehicleCombination[] = [];

	for (const vehicle1 of staticVehicles) {
		for (const vehicle2 of staticVehicles) {
			combinations.push({
				vehicle1: vehicle1.id,
				vehicle2: vehicle2.id,
			});
		}
	}

	return combinations;
}

export function getVehicleById(id: string): Vehicle | undefined {
	return staticVehicles.find((v) => v.id === id);
}

export function getVehicleDisplayName(id: string): string {
	const vehicle = getVehicleById(id);
	return vehicle?.name ?? id;
}

