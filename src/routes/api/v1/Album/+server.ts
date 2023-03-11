import type { Album } from '@prisma/client';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import Service from '../../../../services/service.class';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }: RequestEvent) => {
	const albumService = new Service<Album>('album');
	const id = url.searchParams.get('id');
	let results: any | any[] | null;
	if (id !== null) {
		results = await albumService.readOne(Number(id));
	} else {
		results = await albumService.readAll();
	}
	return new Response(JSON.stringify(results));
};