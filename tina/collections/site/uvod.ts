import { PAGE_OPTIONS } from "../../../src/lib/site";
import { activeField, itemLabel, pageTemplate } from "./shared";

export const UvodTemplate = pageTemplate("uvod", "Úvod", [
  { name: "kicker", label: "Text nad nadpisem", type: "string" },
  { name: "title", label: "Nadpis", type: "string", required: true },
  { name: "perex", label: "Perex", type: "string", ui: { component: "textarea" } },
  {
    name: "image",
    label: "Obrázek",
    type: "object",
    fields: [
      { name: "src", label: "Obrázek", type: "image" },
      { name: "alt", label: "Popis obrázku", description: "Pro nevidomé a vyhledávače.", type: "string" },
    ],
  },
  {
    name: "streams",
    label: "Tlačítka (streamy)",
    description: "První aktivní tlačítko je zvýrazněné.",
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: itemLabel(item?.label, item?.active) }),
      defaultItem: { active: true },
    },
    fields: [
      activeField,
      { name: "label", label: "Text", type: "string", required: true },
      { name: "url", label: "Odkaz", type: "string", required: true },
    ],
  },
  {
    name: "shortcuts",
    label: "Zástupci",
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: itemLabel(item?.title, item?.active) }),
      defaultItem: { active: true },
    },
    fields: [
      activeField,
      { name: "title", label: "Nadpis", type: "string", required: true },
      { name: "text", label: "Popis", type: "string" },
      {
        name: "page",
        label: "Stránka webu",
        type: "string",
        options: PAGE_OPTIONS,
      },
      {
        name: "url",
        label: "Jiný odkaz",
        description: "Vyplňte jen pro odkaz mimo web, má přednost před stránkou.",
        type: "string",
      },
    ],
  },
  {
    name: "logo",
    label: "Financování",
    type: "object",
    fields: [
      { name: "src", label: "Obrázek", type: "image" },
      { name: "alt", label: "Popis obrázku", type: "string" },
      { name: "url", label: "Odkaz", description: "Nepovinné.", type: "string" },
    ],
  },
]);
