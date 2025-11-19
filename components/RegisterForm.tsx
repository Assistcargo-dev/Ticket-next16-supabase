
"use client"

import { useEffect, useActionState, useState } from "react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { registerUser, type RegisterResult } from "@/app/actions/register"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const initialState: RegisterResult = { error: "", success: "" }

const ROLES: { value: string; label: string }[] = [
  { value: "user", label: "Usuario" },
  { value: "admin", label: "Admin" },
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Creando..." : "Crear Usuario"}
    </Button>
  )
}

// Tipar mínimamente lo que viene de la BD
type Sector = { id: string; name: string }
type Rango = { id: string; name: string }
type User = { id: string; name: string }

type RegisterFormProps = {
  sectores: Sector[]
  rangos: Rango[]
  users: User[]
}

export default function RegisterForm({ sectores, rangos, users }: RegisterFormProps) {
  console.log(users)
  const [sectorValue, setSectorValue] = useState("")
  const [rangoValue, setRangoValue] = useState("")
  const [userValue, setUserValue] = useState("")
  const [roleValue, setRoleValue] = useState("")
  const router = useRouter()
  const [state, formAction] = useActionState(registerUser, initialState)

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard/admin")
    }
  }, [state.success, router])

  const messageColor = state.error ? "text-red-600" : "text-green-600"
  const message = state.error || state.success

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!sectorValue || !rangoValue || !roleValue) {
          e.preventDefault()
          toast.error("Debe elegir Sector, Posición y Rol.")
          return
        }
      }}
      className="flex w-1/2 flex-col items-center space-y-6 rounded-xl bg-white p-8 shadow-2xl"
    >
      <h1 className="text-center text-3xl font-bold">Alta Usuario</h1>

      {message && (
        <p className={`text-center font-medium ${messageColor}`}>
          {message}
        </p>
      )}

      <Input
        name="name"
        type="text"
        placeholder="Nombre"
        required
        className="w-full rounded-lg border p-3"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-lg border p-3"
      />
      <Input
        name="password"
        type="password"
        placeholder="Contraseña (mínimo 6)"
        required
        minLength={6}
        className="w-full rounded-lg border p-3"
      />
      <Input
        name="password2"
        type="password"
        placeholder="Confirmar Contraseña (mínimo 6)"
        required
        minLength={6}
        className="w-full rounded-lg border p-3"
      />

      <Input
        name="informe1"
        type="text"
        placeholder="Informe 1"
        required
        className="w-full rounded-lg border p-3"
      />

      <Input
        name="informe2"
        type="text"
        placeholder="Informe 2"
        required
        className="w-full rounded-lg border p-3"
      />

      <Input
        name="informe3"
        type="text"
        placeholder="Informe 3"
        required
        className="w-full rounded-lg border p-3"
      />

      <input type="hidden" name="superior" value={userValue} required />

      <Select onValueChange={setUserValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ingrese Superior" />
        </SelectTrigger>

        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" name="sector" value={sectorValue} required />

      <Select onValueChange={setSectorValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ingrese Sector" />
        </SelectTrigger>

        <SelectContent>
          {sectores.map((sector) => (
            <SelectItem key={sector.id} value={sector.id}>
              {sector.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" name="rango" value={rangoValue} required />

      <Select onValueChange={setRangoValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ingrese Posición" />
        </SelectTrigger>

        <SelectContent>
          {rangos.map((rango) => (
            <SelectItem key={rango.id} value={rango.id}>
              {rango.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" name="role" value={roleValue} required />

      <Select value={roleValue} onValueChange={setRoleValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione Rol" />
        </SelectTrigger>

        <SelectContent>
          {ROLES.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <SubmitButton />

    </form>
  )
}
