import type { RequestEvent } from "@sveltejs/kit";

export async function POST({ cookies }: RequestEvent): Promise<Response> {
	cookies.set('access_token', '', {
		path: '/',
		expires: new Date(0)
	});
	cookies.set('refresh_token', '', {
		path: '/',
		expires: new Date(0)
	});
	return new Response("logout success");
}

