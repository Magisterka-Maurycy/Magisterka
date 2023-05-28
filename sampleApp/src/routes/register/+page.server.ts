import { authUrl } from '$lib/server/urls';
import { redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export type RegisterDto = {
	userName: string;
	email: string;
	password: string;
};


export const actions = {
    default: async ({cookies, request}) => {
    const formData = await request.formData()
    const userNameForm = formData.get('userName')
    const emailForm = formData.get('email')
    const passwordForm = formData.get('password')
    if(userNameForm == null){
        return {success: false}
    }
    if(emailForm == null){
        return {success: false}
    }
    if(passwordForm == null){
        return {success: false}
    }
	const userName = userNameForm.toString()
    const email = emailForm.toString()
	const password = passwordForm.toString()
    const registerObject:RegisterDto  = {userName,email,password}
	const bodySet = JSON.stringify(registerObject);
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: bodySet
	};
	const response = await fetch(authUrl + 'register', options);
    if(response.status==201){
    throw redirect(303,"/login")
    }
    }
} satisfies Actions;