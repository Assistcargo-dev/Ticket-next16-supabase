import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined)?.trim().toLowerCase()
        const password = credentials?.password as string | undefined

        if (!email || !password) return null

        // console.log("→ Buscando usuario:", email)

        const user = await prisma.user.findUnique({
          where: { email, active: true },
          select: { id: true, email: true, password: true, role: true, name: true },
        })

        if (!user) {
          // console.log("→ Usuario NO encontrado")
          return null
        }

        const match = await bcrypt.compare(password, user.password!)
        // console.log("→ ¿Password coincide?", match)

        if (!match) return null

        // console.log("→ LOGIN EXITOSO:", user.email, user.role)

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role ?? "user",
          name: user.name,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        if ("role" in user && user.role) {
          token.role = user.role
        }
        token.name = user.name ?? token.name
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        if (token.name) session.user.name = token.name
      }
      return session
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
})
