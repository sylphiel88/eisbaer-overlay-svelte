import { sveltekit } from '@sveltejs/kit/vite';
import dynamicImport from 'vite-plugin-dynamic-import'
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), dynamicImport()],
	server: {
		port: 3000,
		watch: {
			usePolling: true
		}
	},
});
