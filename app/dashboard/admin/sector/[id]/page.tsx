import SectorUpdateForm from "@/components/SectorUpdateForm";
import { getSectorById } from "@/app/actions/sector";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SectorModifyPage({ params }: Props) {
  const { id } = await params;

  const sector = await getSectorById(id);

  if (!sector) {
    notFound();
  }


  return (
    <div className="flex justify-center px-4">
      <SectorUpdateForm id={sector.id} name={sector.name} />
    </div>
  );
}