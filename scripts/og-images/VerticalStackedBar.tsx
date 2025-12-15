import React from "react";
import { Footprint } from "../../src/simulator/footprintEstimator/footprintEstimator";

// Note: We cannot use the actual BarChart.tsx component here because it uses Chart.js,
// which requires a DOM/canvas environment. Satori (used for OG image generation) only
// supports a subset of CSS and renders JSX to SVG, so we recreate the chart visually
// using styled divs that match the BarChart.tsx appearance (colors, stacking order, etc.).

export function VerticalStackedBar({
	footprint,
	maxTotalTCO2e,
	label,
}: {
	footprint: Footprint;
	maxTotalTCO2e: number;
	label: string;
}) {
	const barWidth = 140;
	const maxHeight = 380;

	// Convert to tCO2e (same as BarChart.tsx lines 113-116)
	const productionTCO2e = footprint.productionWithoutBatteryKgCO2e / 1000;
	const batteryTCO2e = footprint.batteryProductionKgCO2e / 1000;
	const usageTCO2e = footprint.usageKgCO2e / 1000;
	const endOfLifeTCO2e = footprint.endOfLifeKgCO2e / 1000;
	const totalTCO2e = (footprint.totalKgCO2e / 1000).toPrecision(3);

	// Scale heights based on max value
	const scale = maxHeight / maxTotalTCO2e;
	const productionHeight = productionTCO2e * scale;
	const batteryHeight = batteryTCO2e * scale;
	const usageHeight = usageTCO2e * scale;
	const endOfLifeHeight = endOfLifeTCO2e * scale;

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			{/* Total label on top */}
			<div
				style={{
					display: "flex",
					fontSize: 16,
					fontWeight: "bold",
					marginBottom: "8px",
					color: "white",
				}}
			>
				{`${totalTCO2e} tCO2e`}
			</div>
			{/* Stacked bar - rendered top to bottom: end of life, usage, battery, production */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: barWidth,
					borderRadius: "4px",
					overflow: "hidden",
				}}
			>
				{/* End of life - Purple - top */}
				<div
					style={{
						display: "flex",
						width: barWidth,
						height: endOfLifeHeight,
						backgroundColor: "rgb(150, 11, 190)",
					}}
				/>
				{/* Usage - Teal */}
				<div
					style={{
						display: "flex",
						width: barWidth,
						height: usageHeight,
						backgroundColor: "rgb(75, 192, 192)",
					}}
				/>
				{/* Battery production - Pink */}
				<div
					style={{
						display: "flex",
						width: barWidth,
						height: batteryHeight,
						backgroundColor: "rgb(255, 160, 190)",
					}}
				/>
				{/* Production (without battery) - Red - bottom */}
				<div
					style={{
						display: "flex",
						width: barWidth,
						height: productionHeight,
						backgroundColor: "rgb(255, 99, 132)",
					}}
				/>
			</div>
			{/* Vehicle name label below */}
			<div
				style={{
					display: "flex",
					height: "60px",
					flexDirection: "column",
					alignItems: "center",
					marginTop: "12px",
					fontSize: 14,
					color: "white",
					textAlign: "center",
					maxWidth: 140,
				}}
			>
				{label}
			</div>
		</div>
	);
}
