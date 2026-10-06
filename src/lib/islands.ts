/**
 * Island registry — every editable region the Tina bridge can refresh in the
 * admin preview. Each entry maps a URL slug under `/tina-island/...` to a
 * fetcher + component + wrapper; the dynamic `[name].ts` route serves them.
 */
import type { IslandConfig, IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';

import type { NastaveniQuery, StrankyQuery } from '../../tina/__generated__/types';
import GalerieBody from '../components/site/GalerieBody.astro';
import KontaktBody from '../components/site/KontaktBody.astro';
import PrihlaskaBody from '../components/site/PrihlaskaBody.astro';
import ProgramBody from '../components/site/ProgramBody.astro';
import RocnikyBody from '../components/site/RocnikyBody.astro';
import SiteFooter from '../components/site/SiteFooter.astro';
import SiteHeader from '../components/site/SiteHeader.astro';
import UvodBody from '../components/site/UvodBody.astro';
import { getNastaveni, getStranka } from './site-data';

/** Island of a page body: the page document of the "Stránky" collection. */
function pageIsland(key: string, component: IslandConfig['component']): IslandConfig {
	return {
		fetch: () => getStranka(key),
		component,
		wrapper: { tag: 'div' },
		propsFromData: (data) => ({ data: (data as QueryResult<StrankyQuery>).data?.stranky }),
	};
}

export const islands: IslandRegistry = {
	'site-header': {
		fetch: () => getNastaveni(),
		component: SiteHeader,
		wrapper: { tag: 'div' },
		propsFromData: (data, params) => ({
			data: (data as QueryResult<NastaveniQuery>).data?.nastaveni,
			current: params.get('current') ?? '',
		}),
	},
	'site-footer': {
		fetch: () => getNastaveni(),
		component: SiteFooter,
		wrapper: { tag: 'div' },
		propsFromData: (data) => ({ data: (data as QueryResult<NastaveniQuery>).data?.nastaveni }),
	},
	'site-uvod': pageIsland('uvod', UvodBody),
	'site-galerie': pageIsland('galerie', GalerieBody),
	'site-program': pageIsland('program', ProgramBody),
	'site-prihlaska': pageIsland('prihlaska', PrihlaskaBody),
	'site-kontakt': pageIsland('kontakt', KontaktBody),
	'site-rocniky': pageIsland('rocniky', RocnikyBody),
};
