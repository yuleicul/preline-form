import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Preline Form",
      customCss: [
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
      ],
      head: [
        {
          tag: "script",
          // https://github.com/htmlstreamofficial/preline/issues/61
          content: `document.addEventListener('astro:page-load', async () => {
				const preline = await import('preline/dist/preline.js')
				preline.HSStaticMethods.autoInit()
			})`,
        },
      ],
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Example Guide",
              link: "/guides/example/",
            },
          ],
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "Components",
          autogenerate: {
            directory: "components",
          },
        },
      ],
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
    react(),
  ],
});
