import { config } from "@/config";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
GoogleProvider({
clientId: config.env.auth.google_id as string,
clientSecret: config.env.auth.google_secret as string
})
    ],
    pages: {
        signIn: '/login',
        error: '/auth/error'
    },
    secret: config.env.next_auth_secret
}