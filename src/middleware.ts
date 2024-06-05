export {default} from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) { 

    const isAuthenticated = request.cookies.get('refreshToken');
    console.log('is tokennnnnnnnnnn here', isAuthenticated)
}



export const config = { matcher: ['/dashboard', '/myProfile', '/trip/create-trip', `/trip/:path`] };
