import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: string;
  phone: string;
  country: string;
  profilePhoto: string;
  linkedin: string;
  additionalInfo: string;
  password: string;
}

export const options: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      name: "credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Name",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials): Promise<User | any> {
        // get data
        const users = await allUsers();

        let foundUser: User = {
          _id: "",
          name: "",
          email: "",
          isAdmin: "",
          phone: "",
          country: "",
          profilePhoto: "",
          linkedin: "",
          additionalInfo: "",
          password: "",
        };

        //
        users.map((u: User) => {
          console.log(u);

          if (
            credentials?.username === u.name &&
            bcrypt.compareSync(credentials?.password!, u.password)
          ) {
            console.log("success");
            foundUser = u;
          }
        });
        console.log("User: ", foundUser);

        // const user = { id: "1", name: "bilal", password: "pass" };

        if (credentials?.username === foundUser.name) {
          return foundUser;
        } else {
          return null;
        }
      },
    }),
  ],
  //     pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // }
};

const allUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`);
  const users = await response.json();

  return users;
};
