import { redirect, type RequestEvent, type RequestHandler } from "@sveltejs/kit";
import querystring from 'querystring'
import CurrViewStore from "../../../../../../../../../Users/queue/eisbaer-overlay-svelte/eisbaer-overlay-svelte/src/Store";

export const GET:RequestHandler = async() => {
const CLIENT_ID = process.env.CLIENT_ID;
  const SCOPE = "user-read-currently-playing";
  const REDIRECT_URI = "http://localhost:3000/api/spotify/refreshTokenCallback";
  throw redirect(302,
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
      })
  );
};