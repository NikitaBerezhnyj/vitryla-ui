// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://NikitaBerezhnyj.github.io",
  base: "/vitryla-ui",
  integrations: [
    starlight({
      title: "Vitryla UI",
      description: "A React UI kit with composable primitives, theming and accessibility defaults.",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/NikitaBerezhnyj/vitryla-ui" }
      ],
      sidebar: [
        {
          label: "Getting started",
          items: [{ autogenerate: { directory: "getting-started" } }]
        },
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }]
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }]
        },
        {
          label: "Links",
          items: [
            {
              label: "Storybook",
              link: "https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/",
              attrs: { target: "_blank" }
            },
            {
              label: "npm",
              link: "https://www.npmjs.com/package/vitryla-ui",
              attrs: { target: "_blank" }
            },
            {
              label: "Releases",
              link: "https://github.com/NikitaBerezhnyj/vitryla-ui/releases",
              attrs: { target: "_blank" }
            }
          ]
        }
      ]
    })
  ]
});
