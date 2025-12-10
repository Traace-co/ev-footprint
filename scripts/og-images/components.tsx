import React from "react";
import { Footprint } from "../../src/simulator/footprintEstimator/footprintEstimator";
import { getShortName } from "./helpers";

// ============ Vertical Stacked Bar Component (matches BarChart.tsx) ============
//
// Note: We cannot use the actual BarChart.tsx component here because it uses Chart.js,
// which requires a DOM/canvas environment. Satori (used for OG image generation) only
// supports a subset of CSS and renders JSX to SVG, so we recreate the chart visually
// using styled divs that match the BarChart.tsx appearance (colors, stacking order, etc.).

export function VerticalStackedBar({
	footprint,
	maxTotalTCO2e,
	label
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
			<div style={{
				display: "flex",
				fontSize: 16,
				fontWeight: "bold",
				marginBottom: "8px",
				color: "white"
			}}>
				{`${totalTCO2e} tCO2e`}
			</div>
			{/* Stacked bar - rendered top to bottom: end of life, usage, battery, production */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				width: barWidth,
				borderRadius: "4px",
				overflow: "hidden"
			}}>
				{/* End of life - Purple - top */}
				<div style={{
					display: "flex",
					width: barWidth,
					height: endOfLifeHeight,
					backgroundColor: "rgb(150, 11, 190)"
				}} />
				{/* Usage - Teal */}
				<div style={{
					display: "flex",
					width: barWidth,
					height: usageHeight,
					backgroundColor: "rgb(75, 192, 192)"
				}} />
				{/* Battery production - Pink */}
				<div style={{
					display: "flex",
					width: barWidth,
					height: batteryHeight,
					backgroundColor: "rgb(255, 160, 190)"
				}} />
				{/* Production (without battery) - Red - bottom */}
				<div style={{
					display: "flex",
					width: barWidth,
					height: productionHeight,
					backgroundColor: "rgb(255, 99, 132)"
				}} />
			</div>
			{/* Vehicle name label below */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginTop: "12px",
				fontSize: 14,
				color: "white",
				textAlign: "center",
				maxWidth: 140
			}}>
				{label}
			</div>
		</div>
	);
}

// ============ Legend Item Component ============

export function LegendItem({ color, label }: { color: string; label: string }) {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<div style={{ display: "flex", width: 16, height: 16, backgroundColor: color, marginRight: 6, borderRadius: 2 }} />
			<div style={{ display: "flex" }}>{label}</div>
		</div>
	);
}

// ============ OG Image Component ============

export function OgImage({
	vehicle1Name,
	vehicle2Name,
	footprint1,
	footprint2,
	logoBase64,
}: {
	vehicle1Name: string;
	vehicle2Name: string;
	footprint1: Footprint;
	footprint2: Footprint;
	logoBase64: string;
}) {
	// Sort so the winner (lower footprint) is on the left
	const isVehicle1Winner = footprint1.totalKgCO2e <= footprint2.totalKgCO2e;
	const leftName = isVehicle1Winner ? vehicle1Name : vehicle2Name;
	const rightName = isVehicle1Winner ? vehicle2Name : vehicle1Name;
	const leftFootprint = isVehicle1Winner ? footprint1 : footprint2;
	const rightFootprint = isVehicle1Winner ? footprint2 : footprint1;

	// Calculate max for scaling (in tCO2e, matching BarChart.tsx line 56)
	const maxTotalTCO2e = Math.max(
		Math.ceil(footprint1.totalKgCO2e / 10000) * 10,
		Math.ceil(footprint2.totalKgCO2e / 10000) * 10
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
				<div style={{
					display: "flex",
					alignItems: "center",
				}}>
					<img src={logoBase64} width={32} height={32} style={{ marginRight: "10px" }} />
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ display: "flex", fontSize: 28, fontWeight: "bold" }}>EV Footprint</div>
						<div style={{ display: "flex", fontSize: 24, color: "#aaa" }}>by Tennaxia</div>
					</div>
				</div>
				{/* Legend - moved to header row */}
				<div style={{ display: "flex", gap: "16px", fontSize: 12 }}>
					<LegendItem color="rgb(255, 99, 132)" label="Production" />
					<LegendItem color="rgb(255, 160, 190)" label="Battery" />
					<LegendItem color="rgb(75, 192, 192)" label="Usage" />
					<LegendItem color="rgb(150, 11, 190)" label="End of life" />
				</div>
			</div>

			{/* Chart Area - Vertical bars side by side (winner on left) */}
			<div style={{
				display: "flex",
				flex: 1,
				alignItems: "flex-end",
				justifyContent: "center",
				gap: "60px",
				paddingBottom: "20px"
			}}>
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
			<div style={{
				display: "flex",
				justifyContent: "center",
				fontSize: 32,
				color: "#0BD89D",
				fontWeight: "bold"
			}}>
				{`${winner} emits ${ratio}x less CO2 than ${getShortName(rightName)}`}
			</div>
		</div>
	);
}
