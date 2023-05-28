import {  mbaUrl } from "$lib/server/urls";


//GET by id from [slug]
export async function GET({ url,cookies, request }) {
	const id = url.pathname.substring(url.pathname.lastIndexOf("/")+1)

	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer
		},
	};
	const response = await fetch(mbaUrl+'data/'+id, options);

	return response;
}

//DELETE by id from [slug]
export async function DELETE({ url,cookies, request }) {
	const id = url.pathname.substring(url.pathname.lastIndexOf("/")+1)

	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer
		},
	};
	const response = await fetch(mbaUrl+'data/'+id, options);

	return response;
}

//PUT by id from [slug]
export async function PUT({ url, cookies, request }) {
	const id = url.pathname.substring(url.pathname.lastIndexOf("/")+1)
	const bodyToSet = await request.json()
	bodyToSet.id = id
	const bodyString = JSON.stringify(bodyToSet)
	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer,
		},
		body:bodyString
	};
	const response = await fetch(mbaUrl+'data/'+id, options);

	return response;
}