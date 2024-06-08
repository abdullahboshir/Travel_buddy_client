import { config } from "@/config";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { gLoginUser } from "./actions/loginUser";
import { baseApi } from "@/app/api/baseApi";


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
    
        const res = await fetch(`${baseApi}/api/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });
        
        const user = await res.json();

       
        if (!res.ok || !user.success) {
            throw new Error(user.message || 'Login failed');
        }

        return user;
    }
})
],

    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    secret: config.env.next_auth_secret,
    callbacks: {
        async jwt({token, user}: {user: any, token: any}){
            if(user){
                const userInfo = {
                    username: user?.name,
                    email: user?.email
                }
                const gUser = await gLoginUser(userInfo);
                
                token.id = user?.data?.id || gUser?.data?.id,
                token.accessToken = user?.data?.accessToken || gUser?.data?.accessToken,
                token.role = user?.data?.role || gUser?.data?.role
            }
            return token;
        },
        async session({ session, token }: {session: any, token: any}) {
            session.user.id = token.id;
            session.user.accessToken = token.accessToken;
            session.user.role = token.role;
            return session;
          }
          
    },
    debug: true
}