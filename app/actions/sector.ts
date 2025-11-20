"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type SectorResult = {
  error?: string;
  success?: string;
};

export async function getAllSectors() {
  const sectors = await prisma.sector.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
    },
  });
  return sectors;
}

export async function getSectorById(sectorId: string) {
  const sector = await prisma.sector.findUnique({
    where: {
      id: sectorId,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return sector;
}

export async function createSector(
  _prevState: SectorResult | undefined,
  formData: FormData
): Promise<SectorResult> {
  const name = (formData.get("name") as string)?.trim();

  if (!name) {
    return { error: "Nombre inválido" };
  }

  try {
    await prisma.sector.create({
      data: {
        name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear sector";
    console.error("Error creando sector", error);
    return { error: message };
  }

  return { success: `¡Sector creado! Nombre: ${name}` };
}

export async function updateSector(
  prevState: SectorResult,
  formData: FormData
): Promise<SectorResult> {
  try {
    const sectorId = formData.get("id") as string
    const name = formData.get("name") as string

    if (!name) {
      return { error: "Nombre inválido" };
    }

    await prisma.sector.update({
      where: {
        id: sectorId,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    })

    return { success: `¡Sector modificado! Nombre: ${name}`, error: "" }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al modificar sector"
    console.error("Error modificando sector", error)
    return { error: message, success: "" }
  }
}

export async function deleteSectorById(id: string) {
  if (!id) throw new Error("ID inválido")

  await prisma.sector.update({
    where: { id },
    data: { active: false }, // soft delete
  })

  revalidatePath("/dashboard/admin")
}



