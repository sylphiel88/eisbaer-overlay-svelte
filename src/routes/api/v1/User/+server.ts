import type { User } from '@prisma/client';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import Service from '../../../../services/service.class';

/** @type {import('./$types').RequestHandler} */
export const GET = async({url}:RequestEvent) => {
    const userService = new Service<User>('user')
    const id = url.searchParams.get('id')
    let results: User|User[]|null
    if(id !== null){
        results = await userService.readOne(Number(id))
    } else {
        results = await userService.readAll()
    }
    return new Response(JSON.stringify(results))
}