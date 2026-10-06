// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import tailwindcss from '@tailwindcss/vite';

// Every page prerenders to static HTML; the one on-demand route
// (/tina-island, the visual-editing endpoint) runs as a Netlify Function on
// Netlify and on a Node server locally.
async function getAdapter() {
	if (process.env.NETLIFY) return (await import('@astrojs/netlify')).default();
	return (await import('@astrojs/node')).default({ mode: 'standalone' });
}

// Prefer an explicit SITE_URL; otherwise use the URL Netlify injects so
// absolute URLs (sitemap, canonical, OpenGraph) work without configuration.
// Local builds fall back to localhost.
function getSiteUrl() {
	if (process.env.SITE_URL) return process.env.SITE_URL;
	if (process.env.NETLIFY && process.env.URL) return process.env.URL;

	return 'http://localhost:4321';
}

// https://astro.build/config
export default defineConfig({
	site: getSiteUrl(),
	output: 'static',
	adapter: await getAdapter(),
	integrations: [sitemap(), tina()],
	build: {
		// Inline the bundled CSS into a <style> in <head> instead of a separate
		// render-blocking <link>. Astro's default ('auto') only inlines
		// stylesheets under ~4 KiB.
		inlineStylesheets: 'always',
	},
	// In the admin preview TinaCloud serves CMS images from assets.tina.io;
	// allow them so <Image> can resize them (Netlify Image CDN on Netlify).
	image: {
		// Astro 6 responsive images: auto-emit srcset so the browser picks a
		// variant matched to the rendered box + DPR, not the full intrinsic size.
		layout: 'constrained',
		remotePatterns: [{ protocol: 'https', hostname: 'assets.tina.io' }],
	},
	vite: {
		plugins: [tailwindcss(), tinaAdminDevRedirect()],
		// Bundle @tinacms/astro into the SSR build instead of resolving it
		// per-module on every cold request (its components ship as source
		// `.astro` files that would otherwise be compiled on first request).
		ssr: {
			noExternal: ['@tinacms/astro', '@tinacms/bridge'],
		},
		build: {
			rollupOptions: {
				onwarn(warning, warn) {
					if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
						warning.exporter === 'tinacms/dist/client') {
						return;
					}
					warn(warning);
				}
			}
		}
	}
});
