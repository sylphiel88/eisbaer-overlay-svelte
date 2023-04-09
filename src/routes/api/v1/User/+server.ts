import type { User } from '@prisma/client';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import UserService from '../../../../../src/services/UserService.class';

const userService = new UserService()

export const GET:RequestHandler = async({url}:RequestEvent) => {
    const id = url.searchParams.get('id')
    let results: User|User[]|null
    if(id !== null){
        results = await userService.readOne(Number(id))
    } else {
        results = await userService.readAll()
        results.sort((a, b) => a.username.localeCompare(b.username))
    }
    return new Response(JSON.stringify(results))
}

export const PATCH:RequestHandler = async({request}:RequestEvent) => {
    let args = await request.json()
    let results = await userService.update({...args})
    results.sort((a, b) => a.username.localeCompare(b.username))  
    return new Response(JSON.stringify(results))
}

export const DELETE:RequestHandler = async({request}:RequestEvent) => {
    let { userId } = await request.json()
    let results = await userService.deleteOne(userId)
    results.sort((a, b) => a.username.localeCompare(b.username))
    return new Response(JSON.stringify(results))
}