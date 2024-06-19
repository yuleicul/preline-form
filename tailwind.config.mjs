import starlightPlugin from "@astrojs/starlight-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        "ft-brand": "#009188", // teal-600
      },
    },
  },
  plugins: [
    starlightPlugin(),
    require("@tailwindcss/forms"),
    require("preline/plugin"),
  ],
};
