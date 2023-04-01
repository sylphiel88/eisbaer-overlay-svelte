import{ redirect } from "@sveltejs/kit"
import querystring from "querystring"
import type { PageServerLoad } from "./$types";
import DBClient from "../../../../db/prismaClient";
import CurrViewStore from "../../../../Store";
import { get } from 'svelte/store'

export const load:PageServerLoad = async({url}) => {
  let username = get(CurrViewStore)
  const code = url.searchParams.get('code')
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const REDIRECT_URI = "http://localhost:3000/api/spotify/refreshTokenCallback";
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      code: code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
    }),
  });
  let jResponse = await response.json()
  let refresh_token = jResponse["refresh_token"]
  await DBClient.getInstance().prisma.user.update({
    where:{
        username: username
    },
    data:{
        refreshtoken: refresh_token
    }
  })
  throw redirect(302, '/')
}