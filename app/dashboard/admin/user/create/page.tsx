
import { getAllSectors } from "@/app/actions/sector"
import { getAllRangos } from "@/app/actions/rango"
import { getAllUser } from "@/app/actions/user"
import RegisterForm from "@/components/RegisterForm"

export default async function RegisterPage() {
  const [sectores, rangos, users] = await Promise.all([getAllSectors(), getAllRangos(), getAllUser()])

  return (
    <div className="flex justify-center px-4">
      <RegisterForm sectores={sectores} rangos={rangos} users={users} />
    </div>
  )
}