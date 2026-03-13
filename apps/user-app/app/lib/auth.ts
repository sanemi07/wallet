import Credentials from "next-auth/providers/credentials"
import { prisma } from "@repo/db"
import bcrypt from "bcrypt"
import { z } from "zod"

const logInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password", placeholder: "password" }
      },

      async authorize(credentials) {
        if (!credentials) return null

        const parsedInput = logInSchema.safeParse(credentials)

        if (!parsedInput.success) return null

        const { email, password } = parsedInput.data

        const user = await prisma.user.findUnique({
          where: { email }
        })

        // create user if not exists
        if (!user) {
          const hashPass = await bcrypt.hash(password, 10)

          const createUser = await prisma.user.create({
            data: {
              email,
              password: hashPass
            }
          })

          return {
            id: String(createUser.id),
            email: createUser.email
          }
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) return null

        return {
          id: String(user.id),
          email: user.email
        }
      }
    })
  ],
  secret:process.env.NEXTAUTH_SECRET
}