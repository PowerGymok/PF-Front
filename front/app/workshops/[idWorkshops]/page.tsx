
import { workshopsMock } from "@/features/workshops/workshops.mock";
import { notFound } from "next/navigation";


interface WorkshopPageDetailProps {
  params: {
    idWorkshop: string;
  };
}

const WorkshopPageDetail = ({ params }: WorkshopPageDetailProps) => {
  const workshopId = Number(params.idWorkshop);

  const workshop = workshopsMock.find(
    (w) => w.id === workshopId
  );

  if (!workshop) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">
        {workshop.title}
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <p>
          <span className="font-semibold">Descripción:</span>{" "}
          {workshop.description}
        </p>

        <p>
          <span className="font-semibold">Coach:</span>{" "}
          {workshop.coach}
        </p>

        <p>
          <span className="font-semibold">Fecha:</span>{" "}
          {workshop.date}
        </p>

        {/* <p>
          <span className="font-semibold">Duración:</span>{" "}
          {workshop.duration} minutos
        </p> */}

        <p>
          <span className="font-semibold">Cupo disponible:</span>{" "}
          {workshop.capacity}
        </p>
      </div>
    </div>
  );
};

export default WorkshopPageDetail;