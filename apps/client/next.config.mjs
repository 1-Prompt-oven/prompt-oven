/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa"

const nextConfig = {
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.(".svg"),
		)

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ["@svgr/webpack"],
			},
		)
		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
	reactStrictMode: true,
	transpilePackages: ["@repo/ui"],
	experimental: {
		serverActions: {
			bodySizeLimit: "6mb",
		},
	},
	images: {
		domains: [
			"promptoven.s3.ap-northeast-2.amazonaws.com",
			"promptoven.shop",
			"www.promptoven.shop",
			"firebasestorage.googleapis.com",
			"assets.promptbase.com",
			"hebbkx1anhila5yf.public.blob.vercel-storage.com",
		],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "promptoven.s3.ap-northeast-2.amazonaws.com",
				port: "",
				pathname: "/dummy/**",
			},
			{
				protocol: "https",
				hostname: "promptoven.s3.ap-northeast-2.amazonaws.com",
				port: "",
				pathname: "/client/**",
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

const withPWA = withPWAInit({
	dest: "public",
	disable: false,
	reloadOnOnline: true,
	swcMinify: true,
	workboxOptions: {
		disableDevLogs: true,
	},
})

export default withPWA(nextConfig)
