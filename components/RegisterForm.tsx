// components/RegisterForm.tsx   ← este es "use client"
"use client"

import { useEffect, useActionState } from "react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { registerUser, type RegisterResult } from "@/app/actions/register"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const initialState: RegisterResult = { error: "", success: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creando..." : "Crear Usuario"}
    </Button>
  )
}

export default function RegisterForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(registerUser, initialState)

  useEffect(() => {
    if (state.success) {
      router.push("/login")
    }
  }, [state.success, router])

  const messageColor = state.error ? "text-red-600" : "text-green-600"
  const message = state.error || state.success

  return (
    <form action={formAction} className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-center">Crear Usuario</h1>
      <Input name="name" type="text" placeholder="Nombre" required className="w-full rounded-lg border p-3" />
      <Input name="email" type="email" placeholder="Email" required className="w-full rounded-lg border p-3" />
      <Input
        name="password"
        type="password"
        placeholder="Contraseña (mínimo 6)"
        required
        minLength={6}
        className="w-full rounded-lg border p-3"
      />
      <select name="role" className="w-full rounded-lg border p-3" defaultValue="user">
        <option value="user">Usuario</option>
        <option value="admin">Admin</option>
      </select>

      <SubmitButton />

      {message && <p className={`text-center font-medium ${messageColor}`}>{message}</p>}
    </form>
  )
}
