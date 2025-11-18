import { auth } from "@/app/actions/auth"
import { logout } from "@/app/actions/authenticate"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
//import LayoutDashboard from "@/app/dashboard/layout"

export default async function Dashboard() {
  const session = await auth()

  if (!session) redirect("/login")
  if (session.user.role !== "admin" && session.user.role !== "user") redirect("/login")

  return (
    //<LayoutDashboard>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="rounded-xl bg-white p-10 shadow-2xl">
        <h1 className="text-3xl font-bold">¡Bienvenido {session.user.email}!</h1>
        <p className="mt-4 text-xl">Tu rol: <strong>{session.user.role}</strong></p>
        <form action={logout}>
          <Button type="submit" className="mt-8 rounded bg-red-600 px-6 py-3 text-white hover:bg-red-700">
            Cerrar sesión
          </Button>
        </form>
      </div>
    </div>
    // </LayoutDashboard>
  )
}
