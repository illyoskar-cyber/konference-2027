/**
 * Czech typography for CMS texts: non-breaking spaces where a line must not
 * break. Applied when rendering only — the content files stay untouched.
 */
const NBSP = ' ';

export function typo(text: string): string {
	return (
		text
			// One-letter prepositions and conjunctions stay with the next word: "v Beskydech", "a LMŠ".
			.replace(/(?<=^|[\s(„"'])([aikosuvz]) /giu, `$1${NBSP}`)
			// Ordinal numbers and dates: "23. března", "1. kmen", "24. 3." (not a sentence end).
			.replace(/(?<=\d\.) (?=[\p{Ll}\d])/gu, NBSP)
			// Short abbreviations before a number: "č. 5", "č.ev. 906".
			.replace(/(?<=(?:^|\s)[\p{L}.]{1,5}\.) (?=\d)/gu, NBSP)
			// Numbers and units: "10 %", "5 km", "200 Kč".
			.replace(/(?<=\d) (?=(?:%|‰|°C?|Kč|€|km|m|cm|mm|kg|g|l|h|min)(?![\p{L}\d]))/gu, NBSP)
			// A dash never starts a line: "Hnízdo — škola".
			.replace(/ (?=[–—])/gu, NBSP)
	);
}

/**
 * Copy of query data with `typo()` applied to every string. Keys starting
 * with "_" (Tina metadata such as _content_source, _sys, __typename) are
 * copied as they are, so visual editing keeps working.
 */
export function typoDeep<T>(value: T): T {
	if (typeof value === 'string') return typo(value) as T;
	if (Array.isArray(value)) return value.map((item) => typoDeep(item)) as T;
	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, key.startsWith('_') ? item : typoDeep(item)]),
		) as T;
	}
	return value;
}
