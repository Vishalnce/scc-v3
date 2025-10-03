import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import GoogleProvider from "next-auth/providers/google"

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials: any) {
        const userEmail = credentials.email;
        const userPassword = credentials.password;

        const user = await db.user.findFirst({
          where: {
            email: userEmail,
            password: userPassword,
          },
        });

        if (!user) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.first} ${user.last}`,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
  })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        // first time login
        token.id = user.id;
        token.role = user.role || "USER";
      }

      return token;
    },
    session: ({ session, token }: any) => {
      // expose userId and role in session
      if (session && session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "USER";
      }
  
      return session;
    },
async signIn({ account, profile }:any) {
      if (account.provider === "google") {
        // Save or update user in your DB

      

        const existingUser = await db.user.findFirst({ where: { email: profile.email } });
        if (!existingUser) {
          await db.user.create({
            data: {
              first:profile.given_name,
              last:profile.family_name,
              email: profile.email,
              
              // add other fields as needed
            },
          });
        }
      }
      
      return true;
    },



    
    



    
  },

   pages: {
    signIn: '/login',
   }
}