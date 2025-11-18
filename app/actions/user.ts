"use server"

import { prisma } from "@/lib/prisma"


export default async function getUser() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })
  return users
}

