import { pageHeadFields, pageTemplate } from "./shared";

export const PrihlaskaTemplate = pageTemplate("prihlaska", "Přihláška", [
  ...pageHeadFields,
  {
    name: "subject",
    label: "Předmět e-mailu s přihláškou",
    type: "string",
    required: true,
  },
  { name: "hint", label: "Poznámka pod formulářem", type: "string" },
  {
    name: "success",
    label: "Potvrzení po odeslání",
    type: "object",
    fields: [
      { name: "title", label: "Nadpis", type: "string" },
      { name: "text", label: "Text", type: "string", ui: { component: "textarea" } },
    ],
  },
]);
