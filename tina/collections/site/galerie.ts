import { pageHeadFields, pageTemplate } from "./shared";

// The photos aren't listed here: the gallery shows every image from the
// "galerie" folder of the media manager (see src/lib/site-gallery.ts).
export const GalerieTemplate = pageTemplate("galerie", "Galerie", pageHeadFields);
