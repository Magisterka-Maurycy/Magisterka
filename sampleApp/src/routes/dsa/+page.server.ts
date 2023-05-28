import { dsaUrl } from '$lib/server/urls';
import type { Actions, RequestEvent } from './$types';
import type { Load } from "@sveltejs/kit"



export const load: Load = (async (event) => {
	const res = await event.fetch('/api/dsa');
	const names: string[] = await res.json();
	console.log(names)
	return {
		names
	};
})


export type LoginDto = {
	userName: string;
	password: string;
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const accessToken = cookies.get("access_token")
		const bearer = 'Bearer ' + accessToken;

		const formData = await request.formData()
		
		console.log(formData)
		console.log(formData)
		const options = {
			method: 'POST',
			headers: {
				Authorization: bearer
			},
			body: formData
		}
		console.log(options)
		
		const response = await fetch(dsaUrl, options);

		console.log(response.status)


		return { success: true };
	}
}