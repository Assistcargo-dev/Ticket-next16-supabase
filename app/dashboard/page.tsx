import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/app/actions/auth"
import { getUserById } from "@/app/actions/user"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const usuario = await getUserById(session.user.id)

  if (!usuario) {
    redirect("/login")
  }

  const { informe1, informe2, informe3 } = usuario


  return (
    <div className="container mx-auto p-1">
      <Tabs defaultValue="informes" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="informes">Informes</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>

        {/* ----- TAB PRINCIPAL: INFORMES ----- */}
        <TabsContent value="informes" className="mt-4">

          {/* Tabs secundarios */}
          <Tabs defaultValue="inf1" className="w-full">
            <TabsList>
              <TabsTrigger value="inf1">Informe A</TabsTrigger>
              <TabsTrigger value="inf2">Informe B</TabsTrigger>
              <TabsTrigger value="inf3">Informe C</TabsTrigger>
            </TabsList>

            <TabsContent value="inf1" >
              <iframe
                src={informe1 || "https://assistcargo.com"}
                className="border rounded w-full min-h-[700px]"
              />
            </TabsContent>

            <TabsContent value="inf2" className="min-h-screen ">
              <iframe
                src={informe2 || "https://assistcargo.com"}
                className="border rounded w-full min-h-[700px]"
              />
            </TabsContent>

            <TabsContent value="inf3" className="min-h-screen ">
              <iframe
                src={informe3 || "https://assistcargo.com"}
                className="border rounded w-full min-h-[700px]"
              />
            </TabsContent>



          </Tabs>
        </TabsContent >

        <TabsContent value="tickets">
          Aquí va el contenido de tickets
        </TabsContent>
      </Tabs >
    </div>
  )
}
