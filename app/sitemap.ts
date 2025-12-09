import { generateAllCombinations } from "@/lib/vehicleCombinations";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://evfootprint.org";

	const mainPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: `${baseUrl}/methodology`,
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			priority: 0.8,
		},
	];

	const combinations = generateAllCombinations();
	const comparisonPages: MetadataRoute.Sitemap = combinations.map((combo) => ({
		url: `${baseUrl}/compare/${combo.vehicle1}/${combo.vehicle2}/`,
		lastModified: new Date(),
		priority: 0.7,
	}));

	return [...mainPages, ...comparisonPages];
}
