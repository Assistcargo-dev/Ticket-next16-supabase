
import RangoUpdateForm from "@/components/RangoUpdateForm";
import { getRangoById } from "@/app/actions/rango";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RangoModifyPage({ params }: Props) {

  const { id } = await params

  const rango = await getRangoById(id)

  if (!rango) {
    notFound()
  }

  return (
    <div className="flex justify-center px-4">
      <RangoUpdateForm id={rango.id} name={rango.name} />
    </div>
  )
}