import { pageHeadFields, pageTemplate } from "./shared";

export const KontaktTemplate = pageTemplate("kontakt", "Kontakt", [
  ...pageHeadFields,
  {
    name: "address",
    label: "Adresa",
    description: "Každý řádek adresy zvlášť, volitelně s odkazem.",
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.text }),
    },
    fields: [
      { name: "text", label: "Text", type: "string", required: true },
      { name: "url", label: "Odkaz", type: "string" },
    ],
  },
  { name: "phone", label: "Telefon", description: "Např. +420 725 781 842", type: "string" },
  { name: "email", label: "E-mail", type: "string" },
  {
    name: "team",
    label: "Organizační tým",
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.name }),
    },
    fields: [
      { name: "name", label: "Jméno", type: "string", required: true },
      { name: "role", label: "Role", type: "string" },
    ],
  },
]);
