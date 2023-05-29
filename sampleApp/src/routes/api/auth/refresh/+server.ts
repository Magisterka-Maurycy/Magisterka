import { authUrl } from "$lib/server/urls";
import { error } from '@sveltejs/kit';

export async function POST({cookies, request}) {
	const refreshToken = cookies.get("refresh_token")
	if(refreshToken == undefined){
		throw  error(400,"no refresh token cookie")
	}
	const bodySet = '{"refreshToken":"' + refreshToken + '"}';
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: bodySet
	};
	const response = await fetch(authUrl + 'refresh', options);
	const responseJson = await response.json();
	//TODO: refresh returns are needed to be transformed
	cookies.set("access_token",responseJson.access_token, {
		path: "/",
		maxAge: 60 * 60 * 24,
		sameSite: 'strict',
		secure: true
	})
	//TODO: refresh returns are needed to be transformed
	cookies.set("refresh_token",responseJson.refresh_token, {
		path: "/",
		maxAge: 60 * 60 * 24,
		sameSite: 'strict',
		secure: true
	})
	return new Response("test")
}
