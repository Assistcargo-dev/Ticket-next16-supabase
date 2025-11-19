"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function getAllUser() {
  const users = await prisma.user.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })
  return users
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })
  return user
}

export async function updateUserById(userId: string, name: string, email: string, role: string) {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })
  return updatedUser
}

export async function deleteUserById(id: string) {
  if (!id) throw new Error("ID inválido")

  await prisma.user.update({
    where: { id },
    data: { active: false }, // soft delete
  })

  revalidatePath("/dashboard/admin")
}
