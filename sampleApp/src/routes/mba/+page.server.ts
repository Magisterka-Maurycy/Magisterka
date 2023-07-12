import { mbaUrl } from '$lib/server/urls';
import type { Actions } from './$types';


type MbaData = {
	id: string
	type?: string
	dataStorage: any
}

type MbaDataUpdate = {
	type?: string
	dataStorage: any
}

export const actions = {
	create: async ({ cookies, request }) => {
		const formData = await request.formData()
		const idForm = formData.get("id")

		if (idForm == null) {
			return { success: false }
		}
		const id = idForm.toString()

		const dataMap: Map<string, string> = new Map();
		let i = 0
		while (true) {
			const keyForm = formData.get("key" + i)
			const valForm = formData.get("value" + i)
			if (keyForm == undefined) {
				break;
			}
			if (valForm == undefined) {
				break;
			}
			dataMap.set(keyForm.toString(), valForm.toString())
			i = i + 1;
		}

		const dataStorage = Object.fromEntries(dataMap)
		const mbaData: MbaData = { id, dataStorage }
		const bodyString = JSON.stringify(mbaData)
		const accessToken = cookies.get("access_token")
		const bearer = 'Bearer ' + accessToken;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: bearer,
			},
			body: bodyString
		};
		const response = await fetch(mbaUrl + 'data', options);

		if (response.status != 200) {
			return { success: false }
		}

		return { success: true };
	},
	update: async ({ cookies, request }) => {
		const formData = await request.formData()
		const idForm = formData.get("id")

		if (idForm == null) {
			return { success: false }
		}
		const id = idForm.toString()

		const dataMap: Map<string, string> = new Map();
		let i = 0
		while (true) {
			const keyForm = formData.get("key" + i)
			const valForm = formData.get("value" + i)
			if (keyForm == undefined) {
				break;
			}
			if (valForm == undefined) {
				break;
			}
			dataMap.set(keyForm.toString(), valForm.toString())
			i = i + 1;
		}

		const data = Object.fromEntries(dataMap)
		const mbaData: MbaDataUpdate = { id, data }
		const bodyString = JSON.stringify(mbaData)
		const accessToken = cookies.get("access_token")
		const bearer = 'Bearer ' + accessToken;
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: bearer,
			},
			body: bodyString
		};
		const response = await fetch(mbaUrl + 'data/' + id, options);

		if (response.status != 200) {
			return { success: false }
		}

		return { success: true };
	},
	delete: async ({ cookies, request }) => {
		const formData = await request.formData()
		const idForm = formData.get("id")

		if (idForm == null) {
			return { success: false }
		}
		const id = idForm.toString()

		const accessToken = cookies.get("access_token")
		const bearer = 'Bearer ' + accessToken;
		const options = {
			method: 'DELETE',
			headers: {
				Authorization: bearer,
			}
		};
		const response = await fetch(mbaUrl + 'data/' + id, options);

		if (response.status != 200) {
			return { success: false }
		}

		return { success: true };
	},

} satisfies Actions;