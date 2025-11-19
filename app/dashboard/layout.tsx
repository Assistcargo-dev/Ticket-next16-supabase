// app/dashboard/layout.tsx
import { Suspense } from "react"
import { auth } from "@/app/actions/auth"
import { logout } from "../actions/authenticate"
import { Spinner } from "@/components/ui/spinner"


export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>}>
      <LayoutDashboardContent>{children}</LayoutDashboardContent>
    </Suspense>
  )
}

async function LayoutDashboardContent({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const userName = session?.user?.name ?? session?.user?.email ?? "Invitado"
  const userRole = session?.user?.role ?? "user"

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <a href="/dashboard" className="text-lg font-semibold text-gray-900">
            <h1 className="text-3xl font-bold text-gray-900">Panel Tickets</h1>
          </a>
          <div className="text-sm font-semibold text-gray-600">
            Hola, {userName}
          </div>
        </div>
      </header>
      <div className="grid grid-cols-[150px_1fr] overflow-hidden">
        <aside className="bg-gray-200 p-4">
          <nav className="space-y-2 grid grid-template-columns-1 ">
            <a
              href="/dashboard/tickets"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-300"
            >
              Mi Dashboard
            </a>
            <a
              href="/dashboard/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-300"
            >
              Perfil
            </a>
            {userRole === "admin" && (
              <a
                href="/dashboard/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-300"
              >
                Configuración
              </a>
            )}
            <form action={logout}>
              <button
                type="submit"
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-300 cursor-pointer"
              >
                Cerrar sesión
              </button>
            </form>
          </nav>
        </aside>
        <main>
          <div className="mx-auto w-full py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
