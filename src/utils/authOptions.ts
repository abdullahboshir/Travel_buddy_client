import { config } from "@/config";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
GoogleProvider({
clientId: config.env.auth.google_id as string,
clientSecret: config.env.auth.google_secret as string
}),
CredentialsProvider({
    name: 'Credentials',
    credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const res = await fetch(`${config.env.backend_url}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });
        
        const user = await res.json();

        if(user && user.success === true){
            return user;
        }
        return null;
    }
})
],

    pages: {
        signIn: '/login',
        error: '/auth/error'
    },
    secret: config.env.next_auth_secret,
    callbacks: {
        async jwt({token, user}: {user: any, token: any}){
            if(user){
                token.id = user.email,
                token.accessToken = user.name
            }
            return token;
        },
        async session({ session, token }: {session: any, token: any}) {
            session.user.id = token.id;
            session.user.accessToken = token.accessToken;
            return session;
          }
          
    }
}