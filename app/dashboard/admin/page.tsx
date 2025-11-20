
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table } from "@/components/ui/table"
import { getAllUser } from "@/app/actions/user"
import { getAllSectors } from "@/app/actions/sector"
import { getAllRangos } from "@/app/actions/rango"
import DeleteRangoButton from "@/components/DeleteRangoButton"
import DeleteSectorButton from "@/components/DeleteSectorButton"
import DeleteUserButton from "@/components/DeleteUserButton"
import Link from "next/link"



export default async function AdminPage() {

  const users = await getAllUser()
  const sectors = await getAllSectors()
  const rangos = await getAllRangos()

  return (
    <Tabs defaultValue="usuarios" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
        <TabsTrigger value="sector">Sector</TabsTrigger>
        <TabsTrigger value="rango">Rango</TabsTrigger>
      </TabsList>
      <TabsContent value="usuarios">
        <Link href="/dashboard/admin/user/create" className="inline-block mb-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Crear Usuario</Link>
        <Table>
          <thead>
            <tr>
              <th className="text-left border-2 p-2">Nombre</th>
              <th className="text-left border-2 p-2">Username</th>
              <th className="text-left border-2 p-2">Rol</th>
              <th className="text-left border-2 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} >
                <td className="text-left border-2 p-2">{user.name}</td>
                <td className="text-left border-2 p-2">{user.email}</td>
                <td className="text-left border-2 p-2">{user.role}</td>
                <td className="text-left border-2 p-2">
                  {/* Aquí puedes agregar botones o enlaces para editar o eliminar usuarios */}
                  <button className="text-blue-600 hover:underline mr-2">Editar</button>
                  <DeleteUserButton id={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TabsContent>
      <TabsContent value="sector">
        <Link href="/dashboard/admin/sector/create" className="inline-block mb-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Crear Sector</Link>
        <Table>
          <thead>
            <tr>
              <th className="text-left border-2 p-2">Nombre</th>
              <th className="text-left border-2 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector) => (
              <tr key={sector.id} >
                <td className="text-left border-2 p-2">{sector.name}</td>
                <td className="text-left border-2 p-2">
                  {/* Aquí puedes agregar botones o enlaces para editar o eliminar usuarios */}
                  <Link href={`/dashboard/admin/sector/${sector.id}`} className="text-blue-600 hover:underline mr-2">Editar</Link>
                  <DeleteSectorButton id={sector.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TabsContent>
      <TabsContent value="rango">
        <Link href="/dashboard/admin/rango/create" className="inline-block mb-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Crear rango</Link>
        <Table>
          <thead>
            <tr>
              <th className="text-left border-2 p-2">Nombre</th>
              <th className="text-left border-2 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rangos.map((rango) => (
              <tr key={rango.id} >
                <td className="text-left border-2 p-2">{rango.name}</td>
                <td className="text-left border-2 p-2">
                  {/* Aquí puedes agregar botones o enlaces para editar o eliminar usuarios */}
                  <div className="flex flex-rows items-center">
                    <Link href={`/dashboard/admin/rango/${rango.id}`} className="text-blue-600 hover:underline mr-2">Editar</Link>
                    <DeleteRangoButton id={rango.id} />

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}