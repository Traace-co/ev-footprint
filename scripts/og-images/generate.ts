import React from "react";
import satori from "satori";
import sharp from "sharp";
import { Vehicle } from "../../src/simulator/db/vehicleTypes";
import { OgImage } from "./components";
import {
	DEFAULT_TOTAL_DISTANCE_KM,
	defaultCountry,
	footprintEstimator,
} from "./data";
import { getVehicleById } from "./helpers";

export async function loadFont(): Promise<ArrayBuffer> {
	const response = await fetch(
		"https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff",
	);
	return response.arrayBuffer();
}

export async function generateOgImage(
	vehicles: Vehicle[],
	vehicle1Id: string,
	vehicle2Id: string,
	fontData: ArrayBuffer,
	logoBase64: string,
): Promise<Buffer> {
	const vehicle1 = getVehicleById(vehicles, vehicle1Id)!;
	const vehicle2 = getVehicleById(vehicles, vehicle2Id)!;

	const footprint1 = footprintEstimator.estimate({
		vehicle: vehicle1,
		totalDistanceKm: DEFAULT_TOTAL_DISTANCE_KM,
		country: defaultCountry,
	});
	const footprint2 = footprintEstimator.estimate({
		vehicle: vehicle2,
		totalDistanceKm: DEFAULT_TOTAL_DISTANCE_KM,
		country: defaultCountry,
	});

	const svg = await satori(
		React.createElement(OgImage, {
			vehicle1Name: vehicle1.name,
			vehicle2Name: vehicle2.name,
			footprint1,
			footprint2,
			logoBase64,
		}),
		{
			width: 1200,
			height: 627,
			fonts: [
				{
					name: "Inter",
					data: fontData,
					weight: 400,
					style: "normal",
				},
			],
		},
	);

	const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
	return pngBuffer;
}
