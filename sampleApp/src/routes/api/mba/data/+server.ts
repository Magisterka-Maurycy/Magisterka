import {  mbaUrl } from "$lib/server/urls";

//GET all 
export async function GET({ cookies, request }) {
	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer
		},
	};
	const response = await fetch(mbaUrl+'data', options);

	return response;
}

export async function POST({ cookies, request }) {
	const bodyToSet = await request.json()
	const bodyString = JSON.stringify(bodyToSet)
	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer,
		},
		body:bodyString
	};
	const response = await fetch(mbaUrl+'data', options);

	return response;
}



