import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		files: {
			lib: './lib',
			routes: './routes',
			appTemplate: "./fragments/app.html",
			errorTemplate: "./fragments/error.html",
			serviceWorker: "./worker",
			assets: "./static",
			// hooks files put in ./application/
			hooks: { },
			params: "./application/params",
		},
		alias: {
			"$styles": "./styles",
			"$types": "./types",
			"$utils": "./utils",
			"$core": "./core",
			"$state": "./state",
			"$components": "./components",
			"$directives": "./directives",
		},
		
	},
};

export default config;
