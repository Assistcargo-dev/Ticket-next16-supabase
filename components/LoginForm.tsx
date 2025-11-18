"use client"

import { useEffect, useActionState } from "react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { authenticate, type LoginState } from "@/app/actions/authenticate"

const initialState: LoginState = { error: "", success: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Iniciando..." : "Iniciar Sesión"}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(authenticate, initialState)

  useEffect(() => {
    if (state.success) {
      router.push("/login")
    }
  }, [state.success, router])

  const messageColor = state.error ? "text-red-600" : "text-green-600"
  const message = state.error || state.success


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form action={formAction} className="w-96 space-y-6 rounded-xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold">Login</h1>

        <Input type="hidden" name="redirectTo" value="/dashboard" />
        <Input name="email" type="email" placeholder="Email" required className="w-full rounded border p-3" />
        <Input name="password" type="password" placeholder="Contraseña" required className="w-full rounded border p-3" />
        <SubmitButton />
        {message && <p className={`text-center font-medium ${messageColor}`}>{message}</p>}
      </form>
    </div>
  )
}
