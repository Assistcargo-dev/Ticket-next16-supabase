"use client"

import { useEffect, useActionState } from "react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { createSector, type SectorResult } from "@/app/actions/sector"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const initialState: SectorResult = { error: "", success: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Creando..." : "Crear Sector"}
    </Button>
  )
}

export default function SectorForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(createSector, initialState)

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard/admin")
    }
  }, [state.success, router])

  const messageColor = state.error ? "text-red-600" : "text-green-600"
  const message = state.error || state.success

  return (
    <form action={formAction} className="flex flex-col w-1/2 items-center space-y-6 rounded-xl bg-white p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-center">Alta Sector</h1>
      <Input name="name" type="text" placeholder="Nombre del Sector" required className="w-full rounded-lg border p-3" />

      <SubmitButton />

      {message && <p className={`${messageColor} mt-4`}>{message}</p>}
    </form>
  )
}