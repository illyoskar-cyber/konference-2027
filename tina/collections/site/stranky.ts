import type { Collection } from "tinacms";
import { pageByFile, pageHref } from "../../../src/lib/site";
import { GalerieTemplate } from "./galerie";
import { KontaktTemplate } from "./kontakt";
import { PrihlaskaTemplate } from "./prihlaska";
import { ProgramTemplate } from "./program";
import { RocnikyTemplate } from "./rocniky";
import { UvodTemplate } from "./uvod";

/**
 * All pages of the site, one JSON document per page in src/content/site.
 * The pages are fixed in code, so editors can't create or delete them.
 */
export const StrankyCollection: Collection = {
  name: "stranky",
  label: "Pages",
  path: "src/content/site",
  match: { exclude: "nastaveni" },
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: ({ document }) => pageHref(pageByFile(document._sys.filename)?.key),
  },
  templates: [UvodTemplate, GalerieTemplate, ProgramTemplate, PrihlaskaTemplate, KontaktTemplate, RocnikyTemplate],
};
