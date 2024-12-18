// tailwind config is required for editor support

import type { Config } from "tailwindcss"
import sharedConfig from "@repo/tailwind-config"

const config: Config = {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sora: ["var(--font-sora)", "sans-serif"],
				roboto: ["var(--font-roboto)", "sans-serif"],
			},
			screens: {
				xxs: "400px", //xxs 브레이크포인트 추가
				xs: "480px", // xs 브레이크포인트 추가
				//"max-xxs": { max: "639px" }, // max-xxs 브레이크포인트 추가
			},
			animation: {
				"gradient-border": "gradientBorder 4s linear infinite",
			},
			keyframes: {
				gradientBorder: {
					"0%": { stroke: "url(#gradient-border-start)" },
					"100%": { stroke: "url(#gradient-border-end)" },
				},
			},
		},
	},
	presets: [sharedConfig],
}

export default config
