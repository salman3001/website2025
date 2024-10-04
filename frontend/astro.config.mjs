// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue({ appEntrypoint: "/src/components/vue/app" })],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),
});
