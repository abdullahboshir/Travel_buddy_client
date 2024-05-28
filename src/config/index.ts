import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), 'env')})


export const config = {
    env: {
        next_auth_secret: process.env.NEXTAUTH_SECRET,
        backend_url: process.env.BACKEND_URL,
         auth: {
                google_id: process.env.GOOGLE_ID,
                google_secret: process.env.GOOGLE_SECRET
    }
    }
};