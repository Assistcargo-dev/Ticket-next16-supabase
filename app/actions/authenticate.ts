"use server"

import { signIn, signOut } from "@/app/actions/auth"
import { AuthError } from "next-auth"

export interface LoginState {
  error?: string
  success?: string
}

export async function authenticate(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn("credentials", formData)
    return { error: "" }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Email o contraseña incorrectos" }
      }
      return { error: "No pudimos iniciar sesión, intenta nuevamente." }
    }
    throw error
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" })
}
