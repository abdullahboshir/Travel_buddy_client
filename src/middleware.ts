export {default} from 'next-auth/middleware';

export const config = { matcher: ['/dashboard', '/myProfile', '/trip/create-trip', `/trip/:path`] };
