"use server"

import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export type RegisterResult = {
  error?: string
  success?: string
}

const INVALID_DATA = { error: "Datos inválidos" } as const

export async function registerUser(
  _prevState: RegisterResult | undefined,
  formData: FormData
): Promise<RegisterResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const role = ((formData.get("role") as string) || "user").trim()

  if (!email || !password || password.length < 6) {
    return INVALID_DATA
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    await prisma.user.create({
      data: {
        email,
        name: name || undefined,
        password: hashedPassword,
        role,
      },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Este email ya está registrado" }
    }

    const message = error instanceof Error ? error.message : "Error al registrar"
    console.error("Error creando usuario", error)
    return { error: message }
  }

  return { success: `¡Usuario creado! Email: ${email}` }
}