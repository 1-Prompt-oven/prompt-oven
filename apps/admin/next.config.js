/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ui"],
}

const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "6mb",
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
	},
	images: {
		domains: [
			"promptoven.s3.ap-northeast-2.amazonaws.com",
			"promptoven.shop",
			"www.promptoven.shop",
		],
		remotePatterns: [
			{
				hostname: "promptoven.s3.ap-northeast-2.amazonaws.com",

			},
		],
	},
}

module.exports = nextConfig
