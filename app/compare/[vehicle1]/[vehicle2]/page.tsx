import { generateAllCombinations, getVehicleDisplayName } from "@/lib/vehicleCombinations";
import { LandingPage } from "@/simulator/landingPage/LandingPage";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://evfootprint.org";

interface Props {
	params: Promise<{
		vehicle1: string;
		vehicle2: string;
	}>;
}

export async function generateStaticParams() {
	const combinations = generateAllCombinations();
	return combinations.map((combo) => ({
		vehicle1: combo.vehicle1,
		vehicle2: combo.vehicle2,
	}));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { vehicle1, vehicle2 } = await params;
	const vehicle1Name = getVehicleDisplayName(vehicle1);
	const vehicle2Name = getVehicleDisplayName(vehicle2);

	const title = `${vehicle1Name} vs ${vehicle2Name} - Carbon Footprint Comparison`;
	const description = `Compare the CO2 emissions and environmental impact of ${vehicle1Name} versus ${vehicle2Name} over their lifecycle. Find out which vehicle is better for the climate.`;
	const url = `${SITE_URL}/compare/${vehicle1}/${vehicle2}/`;

	const imageUrl = `${SITE_URL}/compare/${vehicle1}/${vehicle2}/opengraph-image.png`;

	return {
		metadataBase: new URL(SITE_URL),
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			siteName: "EV Footprint",
			type: "website",
			images: [{ url: imageUrl, width: 1200, height: 627, alt: "Vehicle Carbon Footprint Comparison" }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [imageUrl],
		},
	};
}

export default async function ComparePage({ params }: Props) {
	const { vehicle1, vehicle2 } = await params;
	return <LandingPage vehicle1Id={vehicle1} vehicle2Id={vehicle2} />;
}
