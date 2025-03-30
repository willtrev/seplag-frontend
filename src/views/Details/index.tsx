import { useFetchData } from "@/hooks/useFetchData";
import { handleDateFormat } from "@/utils/handleDateFormat";
import { Link, useParams } from "react-router-dom";

export type Pessoa = {
  id: number;
  nome: string;
  idade: string | number;
  urlFoto: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao: string | null;
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO: {
      informacao: string;
      vestimentasDesaparecido: string;
    };
  };
};

export default function Details() {
  const { id } = useParams();
  const { data } = useFetchData<Pessoa>(`pessoa-${id}`, `/v1/pessoas/${id}`);

  const notFound = !data?.ultimaOcorrencia.dataLocalizacao;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="h-24 flex items-center justify-center">
        <h1 className="text-xl font-medium">Pessoas desaparecidas - MT</h1>
      </div>

      <h2 className="text-lg mt-4 text-center mb-4 font-medium">Detalhes</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={data?.urlFoto}
          className="bg-gray-300 min-w-36 w-auto h-48 rounded-sm"
        />
        <h2
          data-located={!notFound}
          className="font-medium w-fit text-lg px-2.5 py-0.5 rounded-full bg-red-700 
                text-white self-center text-center data-[located=true]:bg-green-700"
        >
          {notFound ? "Desaparecido" : "Encontrado"}
        </h2>
        <h3 className="text-xl font-medium">{data?.nome}</h3>
        <p>{data?.idade as string} anos</p>
        <p>
          Desapareceu dia{" "}
          {data?.ultimaOcorrencia?.dtDesaparecimento &&
            handleDateFormat(data?.ultimaOcorrencia?.dtDesaparecimento)}
          , em {data?.ultimaOcorrencia?.localDesaparecimentoConcat}
        </p>
        {data?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO && (
          <div className="flex flex-col gap-1 items-center">
            <span>
              Ultima vez visto vestindo:{" "}
              {
                data?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
                  ?.vestimentasDesaparecido
              }
            </span>
            <span>
              Com a seguinte informação:{" "}
              {data?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao}
            </span>
          </div>
        )}

        {!notFound && (
          <p className="font-medium text-lg">
            Localizado{" "}
            {data?.ultimaOcorrencia?.encontradoVivo ? "vivo" : "morto"} dia{" "}
            {data?.ultimaOcorrencia?.dataLocalizacao &&
              handleDateFormat(data?.ultimaOcorrencia?.dataLocalizacao)}
          </p>
        )}

        {notFound && (
          <Link
            to={`/relatorio/${id}`}
            className="text-white bg-green-500 mt-4 py-2 px-4 rounded-md text-center hover:bg-green-700"
          >
            Tenho informações sobre esta pessoa
          </Link>
        )}
      </div>
    </div>
  );
}
