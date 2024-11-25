import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
        "gradient-button-primary":
          "linear-gradient(98.49deg, #A913F9 -11.31%, #9D3D81 76.26%)",
        "gradient-button-secondary":
          "linear-gradient(98.49deg, #A913F9 -11.31%, #3F5EFB 76.26%)",
        "gradient-carousel":
          "linear-gradient(98.49deg, #A913F9 -11.31%, #F913C4 76.26%)",
        "gradient-desc-title":
          "linear-gradient(98.49deg, #A913F9 -11.31%, #FC466B 76.26%)",
        "gradient-profile-banner":
          "linear-gradient(116.85deg, #B514F1 0%, #0BA9FF 100%)",
        "gradient-filter":
          "linear-gradient(116.85deg, #3F1C24 0%, #262038 100%)",
      },
      colors: {
        "po-purple-50": "#E2ADFF",
        "po-purple-100": "#A913F9",
        "po-purple-150": "#7C2FA5",
        "po-purple-200": "#4B0082",
        "po-black-50": "#C4C4C4",
        "po-black-100": "#868686",
        "po-black-150": "#252525",
        "po-black-200": "#111111",
        "po-black-250": "#000000",
        "po-gray-50": "#F5F5F5",
        "po-gray-100": "#D9D9D9",
        "po-gray-150": "#969696",
        "po-gray-200": "#A6A6A6",
        "po-gray-250": "#8C91A2",
        "po-yellow-50": "#FFF9E6",
        "po-yellow-100": "#FCB808",
        "po-yellow-150": "#E6A700",
        "po-yellow-200": "#CC8E00",
        // gradient
        "grf-button-1": "#A913F9",
        "grt-button-1": "#9D3D81",
        "grf-gradient-button-2": "#A913F9",
        "grt-gradient-button-2": "#3F5EFB",
        "grf-gradient-carousel": "#A913F9",
        "grt-gradient-carousel": "#F913C4",
        "grf-gradient-title": "#A913F9",
        "grt-gradient-title": "#FC466B",
        "grf-gradient-profile-banner": "#B514F1",
        "grt-gradient-profile-banner": "#0BA9FF",
        "grf-gradient-filter": "#3F1C24",
        "grt-gradient-filter": "#262038",
      },
    },
  },
  plugins: [],
};
export default config;
