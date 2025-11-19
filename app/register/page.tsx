
import { getAllSectors } from "@/app/actions/sector"
import { getAllRangos } from "@/app/actions/rango"
import RegisterForm from "@/components/RegisterForm"

export default async function RegisterPage() {
  const [sectores, rangos] = await Promise.all([getAllSectors(), getAllRangos()])

  return (
    <div className="flex justify-center px-4">
      <RegisterForm sectores={sectores} rangos={rangos} />
    </div>
  )
}