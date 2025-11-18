
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table } from "@/components/ui/table"
import getUser from "@/app/actions/user"

export default async function AdminPage() {

  const users = await getUser()

  return (
    <Tabs defaultValue="usuarios" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
        <TabsTrigger value="sector">Sector</TabsTrigger>
      </TabsList>
      <TabsContent value="usuarios">
        <Table>
          <thead>
            <tr>
              <th className="text-left">Nombre</th>
              <th className="text-left">Username</th>
              <th className="text-left">Rol</th>
              <th className="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="text-left">{user.name}</td>
                <td className="text-left">{user.email}</td>
                <td className="text-left">{user.role}</td>
                <td className="text-left">
                  {/* Aquí puedes agregar botones o enlaces para editar o eliminar usuarios */}
                  <button className="text-blue-600 hover:underline mr-2">Editar</button>
                  <button className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TabsContent>
      <TabsContent value="password">Administrar Sectores</TabsContent>
    </Tabs>
  )
}