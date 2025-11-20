"use server"

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type RangoResult = {
  error?: string;
  success?: string;
};

export async function getAllRangos() {
  const rangos = await prisma.rango.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
    },
  });
  return rangos;
}

export async function getRangoById(rangoId: string) {
  const rango = await prisma.rango.findUnique({
    where: {
      id: rangoId,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return rango;
}

export async function createRango(
  _prevState: RangoResult | undefined,
  formData: FormData
): Promise<RangoResult> {
  const name = (formData.get("name") as string)?.trim();

  if (!name) {
    return { error: "Nombre inválido" };
  }

  try {
    await prisma.rango.create({
      data: {
        name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear rango";
    console.error("Error creando rango", error);
    return { error: message };
  }

  return { success: `¡Rango creado! Nombre: ${name}` };
}

export async function updateRango(
  prevState: RangoResult,
  formData: FormData
): Promise<RangoResult> {
  const rangoId = formData.get("id") as string
  const name = formData.get("name") as string

  if (!name) {
    return { error: "Nombre inválido" };
  }

  try {
    await prisma.rango.update({
      where: {
        id: rangoId,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al modificar rango"
    console.error("Error modificando rango", error)
    return { error: message, success: "" }

  }

  return { success: `¡Rango modificado! Nombre: ${name}`, error: "" }
}


export async function deleteRangoById(id: string) {
  if (!id) throw new Error("ID inválido")

  await prisma.rango.update({
    where: { id },
    data: { active: false }, // soft delete
  })

  revalidatePath("/dashboard/admin")
}
