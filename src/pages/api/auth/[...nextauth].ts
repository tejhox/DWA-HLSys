import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        nik: { label: "nik", type: "nik" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const { nik, password } = credentials as {
          nik: string;
          password: string;
        };
        const user: any = await signIn(nik);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        (token.nik = user.nik), (token.nama = user.nama);
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("nik" in token) {
        session.user.nik = token.nik;
      }
      if ("nama" in token) {
        session.user.nama = token.nama;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOption);
