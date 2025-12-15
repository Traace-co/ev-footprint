import React from "react";

export function LegendItem({ color, label }: { color: string; label: string }) {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<div
				style={{
					display: "flex",
					width: 16,
					height: 16,
					backgroundColor: color,
					marginRight: 6,
					borderRadius: 2,
				}}
			/>
			<div style={{ display: "flex" }}>{label}</div>
		</div>
	);
}
