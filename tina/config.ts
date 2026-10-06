import { defineConfig } from "tinacms";
import { NastaveniCollection } from "./collections/site/nastaveni";
import { StrankyCollection } from "./collections/site/stranky";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.HEAD || // Netlify
  "main";

export default defineConfig({
  telemetry: 'disabled',
  branch,

  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [StrankyCollection, NastaveniCollection],
  },
});
