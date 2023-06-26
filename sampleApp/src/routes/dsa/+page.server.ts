import { dsaUrl } from '$lib/server/urls';
import type { Actions } from './$types';
import type { Load } from "@sveltejs/kit"



export const load: Load = (async (event) => {
	const res = await event.fetch('/api/dsa');
	const names: string[] = await res.json();
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

		const options = {
			method: 'POST',
			headers: {
				Authorization: bearer
			},
			body: formData
		}

		const response = await fetch(dsaUrl, options);
		if (response.status == 201) {
			return { success: true };
		}
		return { success: false }

	}
}