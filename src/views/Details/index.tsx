import { useFetchData } from "@/hooks/useFetchData";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  console.log(id);

  const { data } = useFetchData(`pessoa-${id}`, `/v1/pessoas/${id}`);

  console.log({ data });

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="h-24 flex items-center justify-center">
        <h1 className="text-xl font-medium">Pessoas desaparecidas - MT</h1>
      </div>

      <h2 className="text-lg mt-4 text-center mb-4 font-medium">Detalhes</h2>

      <div className="flex gap-4 justify-center flex-wrap max-h-[330px] overflow-hidden"></div>

      <h2 className="text-lg mt-4 text-center mb-4 font-medium">Lista</h2>
    </div>
  );
}
