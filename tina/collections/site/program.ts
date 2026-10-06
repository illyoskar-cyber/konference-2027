import { pageHeadFields, pageTemplate } from "./shared";

export const ProgramTemplate = pageTemplate("program", "Program", [
  ...pageHeadFields,
  {
    name: "days",
    label: "Dny",
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.name }),
    },
    fields: [
      { name: "name", label: "Den", description: "Např. Úterý, 23. března 2027", type: "string", required: true },
      { name: "theme", label: "Téma dne", type: "string" },
      { name: "moderators", label: "Moderátoři", description: "Např. Moderátoři: Oskar Illy & Lota Brzobohatá", type: "string" },
      {
        name: "items",
        label: "Program dne",
        type: "object",
        list: true,
        templates: [
          {
            name: "block",
            label: "Blok prezentací",
            ui: {
              itemProps: (item) => ({ label: [item?.time, item?.title].filter(Boolean).join(" ") }),
            },
            fields: [
              { name: "time", label: "Čas", description: "Např. 9:00–10:30", type: "string" },
              { name: "title", label: "Název bloku", type: "string", required: true },
              { name: "tag", label: "Pro koho", description: "Např. pro všechny úrovně", type: "string" },
              {
                name: "talks",
                label: "Prezentace",
                type: "object",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title }),
                },
                fields: [
                  { name: "title", label: "Název", type: "string", required: true },
                  { name: "presenter", label: "Prezentující", type: "string" },
                  { name: "desc", label: "Popis", type: "string", ui: { component: "textarea" } },
                ],
              },
              { name: "aside", label: "Poznámka pod blokem", description: "Např. 🎵 Školní kapela", type: "string" },
            ],
          },
          {
            name: "aside",
            label: "Poznámka",
            ui: {
              itemProps: (item) => ({ label: item?.text }),
            },
            fields: [{ name: "text", label: "Text", description: "Např. 10:30–11:00 Svačina", type: "string", required: true }],
          },
        ],
      },
    ],
  },
]);
