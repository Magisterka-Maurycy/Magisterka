import {  mathUrl } from "$lib/server/urls";

export type StatisticsDto = {
    inputArray: number[];
}

export async function POST({ cookies, request }) {
	const accessToken = cookies.get("access_token")
	const statisticsObject:StatisticsDto  = await request.json()
	const bodySet = JSON.stringify(statisticsObject);
	const bearer = 'Bearer ' + accessToken;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer
		},
		body: bodySet
	};

	const response = await fetch(mathUrl+'statistics', options);

	return response;
}
