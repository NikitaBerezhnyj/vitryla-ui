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
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/<user>/vitryla-ui" }],
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
          label: "Storybook",
          link: "https://<user>.github.io/vitryla-ui/storybook/",
          attrs: { target: "_blank" }
        }
      ]
    })
  ]
});
