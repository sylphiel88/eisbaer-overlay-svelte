import type { Event } from '@prisma/client'
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import EventService from '../../../../services/EventService.class';

/** @type {import('./$types').RequestHandler} */
export const GET:RequestHandler = async({url}:RequestEvent) => {
    let eventService = new EventService()
    let params = url.searchParams
    let result: Event[] = []
    if(params === null){
        result = await eventService.readAll()
    } else {
        let year = Number(params.get('year'))
        let month = Number(params.get('month'))
        if(year!==null && month!==null){  
            result = await eventService.getAllByYearAndMonth(year, month)
        } else {
            result = await eventService.readAll()
        }
    }
    return new Response(JSON.stringify(result))
}