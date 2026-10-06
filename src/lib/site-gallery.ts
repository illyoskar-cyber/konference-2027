/**
 * Gallery photos: every image in public/uploads/galerie (the "galerie"
 * folder in the Tina media manager), read at build time and sorted by file
 * name. New photos therefore show up with the next build.
 */
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export const GALLERY_FOLDER = 'uploads/galerie';

/** Share of photos shown as tall 2:3 tiles; the rest are squares. */
const TALL_SHARE = 0.4;

const IMAGE_FILE = /\.(jpe?g|png|webp|avif|gif)$/i;

export interface GalleryPhoto {
	src: string;
	tall: boolean;
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
	let files: string[];
	try {
		files = await readdir(join(process.cwd(), 'public', GALLERY_FOLDER));
	} catch {
		return [];
	}
	return files
		.filter((file) => IMAGE_FILE.test(file))
		.sort((a, b) => a.localeCompare(b, 'cs', { numeric: true }))
		.map((file) => ({ src: `/${GALLERY_FOLDER}/${file}`, tall: hash(file) < TALL_SHARE }));
}

/**
 * Stable pseudo-random number in [0, 1) from a file name (FNV-1a), so the
 * tile layout stays the same across builds and new photos don't reshuffle
 * the existing ones.
 */
function hash(text: string): number {
	let h = 0x811c9dc5;
	for (const char of text) {
		h ^= char.codePointAt(0)!;
		h = Math.imul(h, 0x01000193);
	}
	return (h >>> 0) / 2 ** 32;
}
