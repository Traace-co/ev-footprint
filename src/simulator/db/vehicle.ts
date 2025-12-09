import { withBasePath } from "@/lib/basePath";
import { parse } from "csv-parse/browser/esm/sync";

export enum Energy {
	Gasoline = "Gasoline",
	Diesel = "Diesel",
	Electricity = "Electricity",
}

export interface Vehicle {
	id: string;
	name: string;
	weightUnladenKg: number;
	batteryCapacitykWh?: number;
	averageRangeKm?: number;
	averageConsumptionPer100km?: number;
	energy: Energy;
}

function parseSanitizedFloat(value: string): number | undefined {
	return value.length > 0 ? parseFloat(value.replace(",", ".")) : undefined;
}

export async function parseAllVehicles(): Promise<Vehicle[]> {
	const databaseString = await (
		await fetch(withBasePath("/vehicles.csv"))
	).text();
	const records = parse(databaseString, {
		columns: true,
		skip_empty_lines: true,
	});
	return records.map((record: any) => {
		return {
			id: record.id,
			name: record.name,
			batteryCapacitykWh: parseSanitizedFloat(record.batteryCapacitykWh),
			averageConsumptionPer100km: parseSanitizedFloat(
				record.averageConsumptionPer100km,
			),
			averageRangeKm: parseSanitizedFloat(record.averageRangeKm),
			weightUnladenKg: parseSanitizedFloat(record.weightUnladenKg),
			energy: record.energy as Energy,
		};
	});
}
