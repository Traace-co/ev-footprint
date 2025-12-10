import * as fs from "fs";
import * as path from "path";
import { loadVehiclesFromCsv } from "./data";
import { generateOgImage, loadFont } from "./generate";
import { generateAllCombinations } from "./helpers";

async function main() {
	console.log("Loading vehicles from CSV...");
	const vehicles = loadVehiclesFromCsv();
	console.log(`Found ${vehicles.length} vehicles.`);

	console.log("Loading font...");
	const fontData = await loadFont();

	console.log("Loading logo...");
	const logoPath = path.join(process.cwd(), "public", "logo_square-white.png");
	const logoBuffer = fs.readFileSync(logoPath);
	const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

	const combinations = generateAllCombinations(vehicles);
	console.log(`Generating ${combinations.length} OG images...`);

	let count = 0;
	for (const combo of combinations) {
		const outputDir = path.join(
			process.cwd(),
			"out",
			"compare",
			combo.vehicle1,
			combo.vehicle2,
		);

		fs.mkdirSync(outputDir, { recursive: true });

		const outputPath = path.join(outputDir, "opengraph-image.png");
		const pngBuffer = await generateOgImage(
			vehicles,
			combo.vehicle1,
			combo.vehicle2,
			fontData,
			logoBase64,
		);
		fs.writeFileSync(outputPath, pngBuffer);

		count++;
		if (count % 10 === 0) {
			console.log(`  Generated ${count}/${combinations.length} images...`);
		}
	}

	console.log(`Done! Generated ${combinations.length} OG images.`);
}

main().catch((err) => {
	console.error("Error generating OG images:", err);
	process.exit(1);
});
