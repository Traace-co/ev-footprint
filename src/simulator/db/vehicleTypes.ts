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

export interface Country {
	id: string;
	name: string;
	kgCO2PerKWh: number;
	emoji?: string;
}

export function parseSanitizedFloat(value: string): number | undefined {
	const trimmed = value.trim();
	return trimmed.length > 0 ? parseFloat(trimmed.replace(",", ".")) : undefined;
}

