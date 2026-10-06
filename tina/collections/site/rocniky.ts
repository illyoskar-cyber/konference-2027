import { pageHeadFields, pageTemplate } from "./shared";

export const RocnikyTemplate = pageTemplate("rocniky", "Minulé ročníky", [
  ...pageHeadFields,
  {
    name: "editions",
    label: "Ročníky",
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.year }),
    },
    fields: [
      { name: "year", label: "Název", description: "Např. Ročník 2026", type: "string", required: true },
      { name: "meta", label: "Popisek", description: "Např. Patron: Petr Horký", type: "string" },
      { name: "url", label: "Odkaz na web ročníku", type: "string", required: true },
    ],
  },
]);
