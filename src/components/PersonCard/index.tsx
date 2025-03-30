import { handleDateFormat } from "@/utils/handleDateFormat";
import { Link } from "react-router-dom";

interface Pessoa {
  id: number;
  nome: string;
  urlFoto: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string | Date;
    dataLocalizacao: string | Date | null;
  };
}

export default function PersonCard(item: Pessoa) {
  return (
    <div
      key={item.id}
      className="border border-gray-300 rounded-md bg-white p-3 h-[330px] w-[200px] flex flex-col gap-2 justify-between"
    >
      <img
        src={item.urlFoto}
        alt=""
        className="max-w-full h-[160px] bg-gray-300 rounded-md object-cover"
      />
      <p className="text-xs text-center font-medium">{item.nome}</p>
      <div className="flex flex-col gap-2">
        <span
          data-located={!!item.ultimaOcorrencia.dataLocalizacao}
          className="font-medium me-2 w-fit text-sm px-2.5 py-0.5 rounded-full bg-red-700 
                text-white self-center text-center data-[located=true]:bg-green-700"
        >
          {!item.ultimaOcorrencia.dataLocalizacao
            ? "Desaparecido"
            : "Encontrado"}
        </span>
        <span className="text-sm text-center">
          {handleDateFormat(
            item?.ultimaOcorrencia?.dtDesaparecimento as string
          )}
        </span>
      </div>
      <div className="flex gap-2 justify-evenly">
        <Link
          to={`/detalhes/${item.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded cursor-pointer text-xs"
        >
          Detalhes
        </Link>
        <Link
          to={`/relatorio/${item.id}`}
          className="bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-2 rounded cursor-pointer text-xs"
        >
          Enviar Dados
        </Link>
      </div>
    </div>
  );
}
