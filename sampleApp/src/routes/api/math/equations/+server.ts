import {  mathUrl } from "$lib/server/urls";

export type EquationDto = {
	coefficients:  Array<number[]>;
    constants:     number[];
    decomposition: string;
};

export async function POST({ cookies, request }) {
	const equationObject:EquationDto  = await request.json()
	const bodySet = JSON.stringify(equationObject);
	const accessToken = cookies.get("access_token")
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer
		},
		body: bodySet
	};

	const response = await fetch(mathUrl+'equation', options);
	
	return response;
}
