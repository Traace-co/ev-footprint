import { parse } from "csv-parse/sync";
import * as fs from "fs";
import * as path from "path";
import { allCountries } from "../../src/simulator/db/country";
import {
	Energy,
	parseSanitizedFloat,
	Vehicle,
} from "../../src/simulator/db/vehicleTypes";
import { FootprintEstimator } from "../../src/simulator/footprintEstimator/footprintEstimator";

export function loadVehiclesFromCsv(): Vehicle[] {
	const csvPath = path.join(process.cwd(), "public", "vehicles.csv");
	const csvContent = fs.readFileSync(csvPath, "utf-8");

	const records = parse(csvContent, {
		columns: true,
		skip_empty_lines: true,
	});

	return records.map((record: any) => ({
		id: record.id,
		name: record.name,
		weightUnladenKg: parseSanitizedFloat(record.weightUnladenKg) ?? 0,
		batteryCapacitykWh: parseSanitizedFloat(record.batteryCapacitykWh),
		averageRangeKm: parseSanitizedFloat(record.averageRangeKm),
		averageConsumptionPer100km: parseSanitizedFloat(
			record.averageConsumptionPer100km,
		),
		energy: record.energy as Energy,
	}));
}

// Use EU average for OG images
export const defaultCountry = allCountries.find((c) => c.id === "eu")!;
export const DEFAULT_TOTAL_DISTANCE_KM = 200000;

// Reuse FootprintEstimator from the main codebase
export const footprintEstimator = new FootprintEstimator();
