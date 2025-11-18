import { auth } from "@/app/actions/auth"

export default async function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const userName = session?.user?.name ?? session?.user?.email ?? "Invitado"

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel Tickets</h1>
          <div className="text-sm font-semibold text-gray-600">Hola, {userName}</div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  )
}
