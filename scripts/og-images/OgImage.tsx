import React from "react";
import { Country } from "../../src/simulator/db/country";
import { Footprint } from "../../src/simulator/footprintEstimator/footprintEstimator";
import { getShortName } from "./helpers";
import { LegendItem } from "./LegendItem";
import { VerticalStackedBar } from "./VerticalStackedBar";

export function OgImage({
	vehicle1Name,
	vehicle2Name,
	footprint1,
	footprint2,
	logoBase64,
	country,
}: {
	vehicle1Name: string;
	vehicle2Name: string;
	footprint1: Footprint;
	footprint2: Footprint;
	logoBase64: string;
	country: Country;
}) {
	// Sort so the winner (lower footprint) is on the left
	const isVehicle1Winner = footprint1.totalKgCO2e <= footprint2.totalKgCO2e;
	const leftName = isVehicle1Winner ? vehicle1Name : vehicle2Name;
	const rightName = isVehicle1Winner ? vehicle2Name : vehicle1Name;
	const leftFootprint = isVehicle1Winner ? footprint1 : footprint2;
	const rightFootprint = isVehicle1Winner ? footprint2 : footprint1;

	// Calculate max for scaling (in tCO2e, matching BarChart.tsx line 56)
	const maxTotalTCO2e =
		Math.max(
			Math.ceil(footprint1.totalKgCO2e / 10000) * 10,
			Math.ceil(footprint2.totalKgCO2e / 10000) * 10,
		) + 10;

	const minTotal = Math.min(footprint1.totalKgCO2e, footprint2.totalKgCO2e);
	const maxTotal = Math.max(footprint1.totalKgCO2e, footprint2.totalKgCO2e);
	const ratio = (maxTotal / minTotal).toFixed(1);
	const winner = getShortName(leftName);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
				color: "white",
				fontFamily: "Inter",
				padding: "40px",
			}}
		>
			{/* Header */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "16px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<img src={logoBase64} width={32} height={32} style={{ marginRight: "10px" }} />
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ display: "flex", fontSize: 28, fontWeight: "bold" }}>EV Footprint</div>
						<div style={{ display: "flex", fontSize: 24, color: "#aaa" }}>by Tennaxia</div>
					</div>
				</div>
				{/* Legend - moved to header row */}
				<div style={{ display: "flex", alignItems: "flex-end", gap: "8px", flexDirection: "column" }}>
					<div style={{ display: "flex", gap: "16px", fontSize: 12 }}>
						<LegendItem color="rgb(255, 99, 132)" label="Production" />
						<LegendItem color="rgb(255, 160, 190)" label="Battery" />
						<LegendItem color="rgb(75, 192, 192)" label="Usage" />
						<LegendItem color="rgb(150, 11, 190)" label="End of life" />
					</div>

					<div style={{ display: "flex", fontSize: 14, color: "#aaa" }}>
						Country: {country.name}
					</div>
				</div>
			</div>

			{/* Chart Area - Vertical bars side by side (winner on left) */}
			<div
				style={{
					display: "flex",
					flex: 1,
					alignItems: "flex-end",
					justifyContent: "center",
					gap: "60px",
					paddingBottom: "20px",
				}}
			>
				<VerticalStackedBar
					footprint={leftFootprint}
					maxTotalTCO2e={maxTotalTCO2e}
					label={getShortName(leftName)}
				/>
				<VerticalStackedBar
					footprint={rightFootprint}
					maxTotalTCO2e={maxTotalTCO2e}
					label={getShortName(rightName)}
				/>
			</div>

			{/* Result summary */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					fontSize: 32,
					color: "#0BD89D",
					fontWeight: "bold",
				}}
			>
				{`${winner} emits ${ratio}x less CO2 than ${getShortName(rightName)}`}
			</div>
		</div>
	);
}
