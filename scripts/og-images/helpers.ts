import { Vehicle } from "../../src/simulator/db/vehicleTypes";

export function getVehicleById(
	vehicles: Vehicle[],
	id: string,
): Vehicle | undefined {
	return vehicles.find((v) => v.id === id);
}

export function getShortName(name: string): string {
	// Shorten vehicle names for the chart
	return name
		.replace(" (B Segment)", "")
		.replace(" (D Segment)", "")
		.replace("Gasoline E95 ", "Gasoline ");
}

export interface VehicleCombination {
	vehicle1: string;
	vehicle2: string;
}

export function generateAllCombinations(
	vehicles: Vehicle[],
): VehicleCombination[] {
	const combinations: VehicleCombination[] = [];
	for (const v1 of vehicles) {
		for (const v2 of vehicles) {
			combinations.push({ vehicle1: v1.id, vehicle2: v2.id });
		}
	}
	return combinations;
}
