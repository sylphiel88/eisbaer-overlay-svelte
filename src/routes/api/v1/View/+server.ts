import type { View } from '@prisma/client';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import Service from '../../../../services/Service.class';

const viewService = new Service<View>('view')

export const GET:RequestHandler = async({url}:RequestEvent) => {
    const id = url.searchParams.get('id')
    let results: View|View[]|null
    if(id !== null){
        results = await viewService.readOne(Number(id))
    } else {
        results = await viewService.readAll()
        results = results.sort((a, b) => a.viewId - b.viewId)
    }
    return new Response(JSON.stringify(results))
}

export const POST:RequestHandler = async({request}:RequestEvent) => {
    let args = await request.json()
    let results = await viewService.create({...args})
    results = results.sort((a, b) => a.viewId - b.viewId)
    return new Response(JSON.stringify(results))
}

export const PATCH:RequestHandler = async({request}:RequestEvent) => {
    let args = await request.json()
    let results = await viewService.update({...args})
    results = results.sort((a, b) => a.viewId - b.viewId)
    return new Response(JSON.stringify(results))
}

export const DELETE:RequestHandler = async({request}:RequestEvent) => {
    let { viewId } = await request.json()
    let results = await viewService.deleteOne(viewId)
    results = results.sort((a, b) => a.viewId - b.viewId)
    return new Response(JSON.stringify(results))
}