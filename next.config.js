/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",

	// Required for static export with images
	images: {
		unoptimized: true,
	},

	// Trailing slashes help with routing
	trailingSlash: true,
};

module.exports = nextConfig;
