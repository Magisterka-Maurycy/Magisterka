import { dsaUrl } from "$lib/server/urls";

export async function GET({ params, cookies }) {
	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'GET',
		headers: {
			Authorization: bearer
		},
	};

	const response = await fetch(dsaUrl+params.slug, options);
	
	return response
}
export async function DELETE({ params, cookies }) {
	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'DELETE',
		headers: {
			Authorization: bearer
		},
	};

	const response = await fetch(dsaUrl+params.slug, options);
	
	return response
}

