import { auth } from "@/app/actions/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await auth()

  if (!session) redirect("/login")
  if (session.user.role !== "admin" && session.user.role !== "user") redirect("/login")

  return (
    <div>

    </div>
  )
}
