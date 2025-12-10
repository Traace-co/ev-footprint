import { withBasePath } from "@/lib/basePath";
import { parse } from "csv-parse/browser/esm/sync";
import { Energy, parseSanitizedFloat, Vehicle } from "./vehicleTypes";

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
