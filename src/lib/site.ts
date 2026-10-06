export function href(path = ''): string {
	return `/${path}`;
}

/**
 * Pages that exist in code; CMS links (menu, shortcuts) pick one by key.
 * `file` is the page's content file in src/content/site — the number keeps
 * the admin list in menu order, since Tina sorts it by file name.
 */
export const PAGES = [
	{ key: 'uvod', label: 'Domů', path: '', file: '1-uvod' },
	{ key: 'galerie', label: 'Galerie', path: 'galerie', file: '2-galerie' },
	{ key: 'program', label: 'Program', path: 'program', file: '3-program' },
	{ key: 'prihlaska', label: 'Přihláška', path: 'prihlaska', file: '4-prihlaska' },
	{ key: 'kontakt', label: 'Kontakt', path: 'kontakt', file: '5-kontakt' },
	{ key: 'rocniky', label: 'Minulé ročníky', path: 'rocniky', file: '6-rocniky' },
];

export function pageByFile(file: string) {
	return PAGES.find((page) => page.file === file);
}

export function pageFile(key: string): string {
	const page = PAGES.find((p) => p.key === key);
	if (!page) throw new Error(`Unknown page "${key}"`);
	return page.file;
}

export const PAGE_OPTIONS = PAGES.map(({ key, label }) => ({ value: key, label }));

export function pageHref(key?: string | null): string {
	return href(PAGES.find((page) => page.key === key)?.path ?? '');
}

/** Link target of a CMS link: an external URL wins over a page of the site. */
export function linkHref(link: { page?: string | null; url?: string | null }): string {
	return link.url || pageHref(link.page);
}
