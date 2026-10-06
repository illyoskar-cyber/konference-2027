import type { Template, TinaField } from "tinacms";

/**
 * Each page of the site is a document of the "Pages" collection with its
 * own template; the template name matches the page key (see PAGES in
 * src/lib/site.ts).
 */
export function pageTemplate(name: string, label: string, fields: TinaField[]): Template {
  return { name, label, fields: [adminTitleField, ...fields, seoField] };
}

/**
 * Hidden name of the page in the admin list ("Úvod", "Galerie", …), so the
 * list doesn't show page headings. The list itself is sorted by file name.
 */
const adminTitleField: TinaField = {
  name: "adminTitle",
  label: "Název v administraci",
  type: "string",
  isTitle: true,
  required: true,
  ui: { component: "hidden" },
};

/** Tag, heading and intro shown at the top of every subpage (PageHead). */
export const pageHeadFields: TinaField[] = [
  { name: "tag", label: "Štítek nad nadpisem", type: "string" },
  { name: "title", label: "Nadpis", type: "string", required: true },
  { name: "intro", label: "Úvodní text", type: "string", ui: { component: "textarea" } },
];

const seoField: TinaField = {
  name: "seo",
  label: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      label: "Titulek v prohlížeči",
      description: "Když zůstane prázdný, použije se nadpis stránky.",
      type: "string",
    },
    {
      name: "description",
      label: "Popis pro vyhledávače",
      description: "Když zůstane prázdný, použije se výchozí popis webu.",
      type: "string",
      ui: { component: "textarea" },
    },
  ],
};

/** Switch for list items that can be hidden on the site without deleting them. */
export const activeField: TinaField = {
  name: "active",
  label: "Aktivní",
  description: "Vypnutá položka se na webu nezobrazí.",
  type: "boolean",
};

/** List item label in the admin, marking switched-off items. */
export const itemLabel = (label: string | undefined, active: boolean | undefined) =>
  active ? label : `${label ?? ""} (neaktivní)`;
