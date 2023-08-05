import type { RequestHandler } from "@sveltejs/kit"
import DBClient from "../../../../db/prismaClient"
import CurrViewStore from "../../../../Store"
import { get } from "svelte/store"

export const GET:RequestHandler = async({request}) => {
    let foundUser = await DBClient.getInstance().prisma.user.findUnique({
        where:{
            username: get(CurrViewStore)
        }
    })
    return new Response(JSON.stringify(foundUser?.username));
}