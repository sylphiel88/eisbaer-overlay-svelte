import type { RequestHandler } from "@sveltejs/kit";

export const POST:RequestHandler = async ({request}) => {
    let { access_token } = await request.json()
	const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
	var auth = 'Bearer ' + access_token;
	let response = fetch(NOW_PLAYING_ENDPOINT, {
		headers: { Authorization: auth }
	});
	let result = await (await response).json()
	return new Response(JSON.stringify(result));
};
