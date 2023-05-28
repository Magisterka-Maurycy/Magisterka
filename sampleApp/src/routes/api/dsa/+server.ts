import { dsaUrl } from "$lib/server/urls";
import { json } from "@sveltejs/kit";

export async function GET({ cookies }) {
	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer
		},
	};

	const response = await fetch(dsaUrl, options);
	const resJ = await response.json()
	return json(resJ);
}


