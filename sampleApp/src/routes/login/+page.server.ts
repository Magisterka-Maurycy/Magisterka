import { authUrl } from '$lib/server/urls';
import type { Actions, RequestEvent } from './$types';

export type LoginDto = {
	userName: string;
	password: string;
};

export const actions = {
    default: async ({cookies, request}: RequestEvent) => {
    const formData = await request.formData()
    
    const userNameForm = formData.get('userName')
    const passwordForm = formData.get('password')
    if(userNameForm == null){
        return {success: false}
    }
    if(passwordForm == null){
        return {success: false}
    }
	const userName = userNameForm.toString()
	const password = passwordForm.toString()
    const loginObject: LoginDto = {userName,password}
	const bodySet = JSON.stringify(loginObject);
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: bodySet
	};
	const response = await fetch(authUrl + 'login', options);
	if(response.status != 200){
		return { success: false};
	}
	const responseJson = await response.json();
	cookies.set("access_token",responseJson.accessToken, {
		path: "/",
		maxAge: 60 * 60 * 24,
		sameSite: 'strict',
		secure: true
	})
	cookies.set("refresh_token",responseJson.refreshToken, {
		path: "/",
		maxAge: 60 * 60 * 24,
		sameSite: 'strict',
		secure: true
	})
    return { success: true };   
    }
} satisfies Actions;