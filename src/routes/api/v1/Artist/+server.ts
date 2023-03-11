import type { Artist } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
import Service from '../../../../services/service.class';

/** @type {import('./$types').RequestHandler} */
export const GET = async({url}:RequestEvent) => {
    const artistService = new Service<Artist>('artist')
    const id = url.searchParams.get('id')
    let results: any|any[]|null
    if(id !== null){
        results = await artistService.readOne(Number(id))
    } else {
        results = await artistService.readAll()
    }
    return new Response(JSON.stringify(results))
}