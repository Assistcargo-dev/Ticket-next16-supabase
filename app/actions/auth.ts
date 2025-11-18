// app/actions/auth.ts
"use server"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Datos inválidos" }
  }
  const hashedPassword = await bcrypt.hash(password, 12) // ← 12 rounds = estándar 2025

  try {
    await prisma.user.create({
      data: { email, password: hashedPassword, role: "user" },
    })
  } catch (error) {
    console.error(error)
    return { error: "Error al registrar" }
  }

  redirect("/login")
}
