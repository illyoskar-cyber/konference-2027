/**
 * Sizes for CMS images so they can go through <Image>/getImage(): Netlify's
 * Image CDN then serves resized WebP; locally the file is passed through.
 *
 * Tina stores images as /uploads/... paths (read from public/ at build
 * time); inside the admin preview TinaCloud hands out remote
 * assets.tina.io URLs instead, which are probed over HTTP.
 */
import { inferRemoteSize } from 'astro:assets';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { imageSize } from 'image-size';

export interface ImageSize {
	width: number;
	height: number;
}

export async function getImageSize(src: string): Promise<ImageSize | undefined> {
	try {
		if (/^https?:\/\//.test(src)) {
			const { width, height } = await inferRemoteSize(src);
			return { width, height };
		}
		const { width, height, orientation } = imageSize(await readFile(join(process.cwd(), 'public', src)));
		// EXIF orientations 5–8 are rotated by 90°.
		return (orientation ?? 0) >= 5 ? { width: height, height: width } : { width, height };
	} catch {
		return undefined;
	}
}

/** Intrinsic size scaled down to at most `maxWidth`; a square if unknown. */
export async function fitImage(src: string, maxWidth: number): Promise<ImageSize> {
	const size = (await getImageSize(src)) ?? { width: maxWidth, height: maxWidth };
	const scale = Math.min(1, maxWidth / size.width);
	return { width: Math.round(size.width * scale), height: Math.round(size.height * scale) };
}
