/**
 * Data loaders for the site (src/content/site): the generated Tina client
 * wrapped in `requestWithMetadata()` so visual editing works inside the
 * admin.
 */
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
import { pageFile } from './site';
import { typoDeep } from './typo';

/** Query result with Czech typography applied to its texts (see typo.ts). */
async function withTypo<T extends { data: unknown }>(request: Promise<T>): Promise<T> {
	const result = await request;
	return { ...result, data: typoDeep(result.data) };
}

export const getNastaveni = () =>
	withTypo(requestWithMetadata(client.queries.nastaveni({ relativePath: 'nastaveni.json' })));

/** A page of the "Pages" collection by its key (see PAGES in site.ts). */
export const getStranka = (key: string) =>
	withTypo(
		requestWithMetadata(client.queries.stranky({ relativePath: `${pageFile(key)}.json` }), { priority: 'primary' }),
	);

type Stranka = NonNullable<Awaited<ReturnType<typeof getStranka>>['data']['stranky']>;
type PageOf<T extends Stranka['__typename']> = Extract<Stranka, { __typename: T }>;

/** The page document narrowed to its template, or undefined. */
export function asPage<T extends Stranka['__typename']>(
	page: Stranka | null | undefined,
	typename: T,
): PageOf<T> | undefined {
	return page?.__typename === typename ? (page as PageOf<T>) : undefined;
}

export type SiteNastaveni = Awaited<ReturnType<typeof getNastaveni>>['data']['nastaveni'];
export type SiteUvod = PageOf<'StrankyUvod'>;
export type SiteGalerie = PageOf<'StrankyGalerie'>;
export type SiteProgram = PageOf<'StrankyProgram'>;
export type SitePrihlaska = PageOf<'StrankyPrihlaska'>;
export type SiteKontakt = PageOf<'StrankyKontakt'>;
export type SiteRocniky = PageOf<'StrankyRocniky'>;
