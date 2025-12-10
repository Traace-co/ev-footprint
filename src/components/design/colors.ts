import { Energy } from "@/simulator/db/vehicleTypes";

export function colorFromEnergy(energy: Energy): string {
	switch (energy) {
		case Energy.Electricity:
			return "#FADB13";
		case Energy.Diesel:
			return "#200F76";
		case Energy.Gasoline:
			return "#041C15";
	}
}

export const navigationBackgroundColor = "#2B225A";
export const secondaryBackgroundColor = "#C1AEFF33";
export const textColor = "#041C15";
