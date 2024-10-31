/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ui"],
	images: {
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
		],
	},
}
