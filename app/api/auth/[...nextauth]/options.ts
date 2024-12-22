import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";


export const options: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        Credentials({
            name: "credentials",

            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Your Name"
                },
                password: {
                    label: "Password",
                    type: "text",
                    placeholder: "Your Password"
                },

            },
            async authorize(credentials) {
                // get data
                const user = {id: "1", name: "bilal", password:"pass"}

                if(credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        
    ],
//     pages: {
//   signIn: '/auth/signin',
//   signOut: '/auth/signout',
//   error: '/auth/error', // Error code passed in query string as ?error=
//   verifyRequest: '/auth/verify-request', // (used for check email message)
//   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
// }
}