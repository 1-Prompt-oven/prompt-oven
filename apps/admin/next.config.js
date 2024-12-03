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
		remotePatterns: [
			{
				protocol: "https",
				hostname: "promptoven.s3.ap-northeast-2.amazonaws.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
				pathname: "/v0/b/**",
			},
			{
				protocol: "https",
				hostname: "assets.promptbase.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
				port: "",
				pathname: "/**",
			},
		],
	},
}

module.exports = nextConfig
