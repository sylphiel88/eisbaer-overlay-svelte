import type { RequestHandler } from "@sveltejs/kit";
import querystring from 'querystring'
import DBClient from "../../../../db/prismaClient";
import { get } from 'svelte/store'
import CurrViewStore from "../../../../Store";

export const GET:RequestHandler = async() => {
    let foundUser = await DBClient.getInstance().prisma.user.findUnique({
        where:{
            username: get(CurrViewStore)
        }
    })
    if(foundUser && foundUser.refreshtoken){
        let result = await getAuthToken(foundUser.refreshtoken)
        return new Response(JSON.stringify(result))
    } else {
        let foundEisbaer = await DBClient.getInstance().prisma.user.findUnique({
            where:{
                username: `eisbaer`
            }
        })
        if(foundEisbaer && foundEisbaer.refreshtoken){
            let result = await getAuthToken(foundEisbaer.refreshtoken)
            return new Response(JSON.stringify(result))
        } else {
            return new Response(JSON.stringify({}))
        }
    }
}

async function getAuthToken(ref:string) {
    const basic = Buffer.from(
        `${process.env['CLIENT_ID']}:${process.env['CLIENT_SECRET']}`
    ).toString('base64');
    var authOptions = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: ref as string
        })
    };
    let result = await fetch('https://accounts.spotify.com/api/token', authOptions);
    let jResult = await result.json()
    return jResult
}