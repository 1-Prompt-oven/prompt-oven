/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ui"],
}

const nextConfig = {
	
	serverActions: {
		allowedOrigins: [
			"api.promptoven.shop",
			"admin.promptoven.shop",
			"localhost",
			"www.promptoven.shop",
			"promptoven.shop",
			"nextjs_client",
			"nextjs_admin",
			"api_backend",
		],
		allowedForwardedHosts: [
			"api.promptoven.shop",
			"admin.promptoven.shop",
			"localhost",
			"www.promptoven.shop",
			"promptoven.shop",
			"nextjs_client",
			"nextjs_admin",
			"api_backend",
		],
	},
}

module.exports = nextConfig
