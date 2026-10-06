import type { Collection } from "tinacms";
import { PAGE_OPTIONS } from "../../../src/lib/site";
import { activeField, itemLabel } from "./shared";

/** Site-wide settings: header, menu, footer and default SEO. */
export const NastaveniCollection: Collection = {
  name: "nastaveni",
  label: "Settings",
  path: "src/content/site",
  match: { include: "nastaveni" },
  format: "json",
  ui: {
    global: true,
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      name: "siteName",
      label: "Název webu",
      description: "Přidává se za titulek každé podstránky v prohlížeči.",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "description",
      label: "Výchozí popis pro vyhledávače",
      description: "Použije se u stránek, které nemají vlastní popis.",
      type: "string",
      ui: { component: "textarea" },
    },
    {
      name: "header",
      label: "Hlavička",
      type: "object",
      fields: [
        { name: "name", label: "Název školy", type: "string" },
        { name: "tagline", label: "Podtitul", type: "string" },
        {
          name: "nav",
          label: "Menu",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({ label: itemLabel(item?.label, item?.active) }),
            defaultItem: { active: true },
          },
          fields: [
            activeField,
            { name: "label", label: "Text", type: "string", required: true },
            { name: "page", label: "Stránka webu", type: "string", options: PAGE_OPTIONS },
            {
              name: "url",
              label: "Jiný odkaz",
              description: "Vyplňte jen pro odkaz mimo web, má přednost před stránkou.",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "footer",
      label: "Patička",
      type: "object",
      fields: [{ name: "text", label: "Text", type: "string" }],
    },
  ],
};
