import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known/')) {
		// You can return a 404 response or handle it however you want
		return new Response('Not found', { status: 404 });
	}
	return resolve(event);
};