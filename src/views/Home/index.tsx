import PersonCard from "@/components/PersonCard";
import { useFetchData } from "@/hooks/useFetchData";
import { useState } from "react";

interface PessoasFilterProps {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: "FEMININO" | "MASCULINO";
  pagina?: number;
  porPagina?: number;
  status?: unknown;
}

interface Pessoa {
  id: number;
  nome: string;
  urlFoto: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string | Date;
    dataLocalizacao: string | Date | null;
  };
}

export default function Home() {
  const [filter, setFilter] = useState<PessoasFilterProps>({
    pagina: 1,
    porPagina: 10,
  });
  const { data } = useFetchData(
    `pessoasbyfilter-${JSON.stringify(filter)}`,
    "/v1/pessoas/aberto/filtro",
    filter
  );

  const { data: dinamic } = useFetchData(
    `pessoasdinamicas`,
    "/v1/pessoas/aberto/dinamico",
    {
      registros: 10,
    }
  );

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="h-24 flex items-center justify-center">
        <h1 className="text-xl font-medium">Pessoas desaparecidas - MT</h1>
      </div>

      <h2 className="text-lg mt-4 text-center mb-4 font-medium">Destaques</h2>

      <div className="flex gap-4 justify-center flex-wrap max-h-[330px] overflow-hidden">
        {dinamic?.map((item: Pessoa) => (
          <PersonCard {...item} />
        ))}
      </div>

      <h2 className="text-lg mt-4 text-center mb-4 font-medium">Lista</h2>

      <form
        className="flex gap-4 border-b border-gray-300 pb-4 mb-4 px-18"
        onSubmit={(form) => {
          form.preventDefault();

          const formData = new FormData(form.currentTarget);
          const nome = formData.get("nome") as string;
          const sexo = formData.get("sexo") as "FEMININO" | "MASCULINO";
          const faixaIdadeInicial =
            formData.get("idade-inicial") &&
            parseInt(formData.get("idade-inicial") as string);
          const faixaIdadeFinal =
            formData.get("idade-final") &&
            parseInt(formData.get("idade-final") as string);
          const status = formData.get("status") as string;

          const formFilter: PessoasFilterProps = {
            nome,
            sexo,
            faixaIdadeInicial: faixaIdadeInicial as number,
            faixaIdadeFinal: faixaIdadeFinal as number,
            status,
          };

          setFilter({ ...filter, ...formFilter });
        }}
      >
        <label className="flex flex-col">
          <span className="text-sm">Nome</span>
          <input
            type="text"
            name="nome"
            className="h-8 bg-white border border-gray-300 rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Sexo</span>
          <select
            name="sexo"
            defaultValue={""}
            className="h-8 bg-white border border-gray-300 rounded-md w-[183px]"
          >
            <option value="">Todos</option>
            <option value="FEMININO">Feminino</option>
            <option value="MASCULINO">Masculino</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Idade inicial</span>
          <input
            type="number"
            name="idade-inicial"
            className="h-8 bg-white border border-gray-300 rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Idade final</span>
          <input
            type="number"
            name="idade-final"
            className="h-8 bg-white border border-gray-300 rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Condição</span>
          <select
            name="status"
            defaultValue={""}
            className="h-8 bg-white border border-gray-300 rounded-md w-[183px]"
          >
            <option value="">Todos</option>
            <option value="DESAPARECIDO">Desaparecido</option>
            <option value="LOCALIZADO">Localizado</option>
          </select>
        </label>
        <button className="h-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer text-sm self-end">
          Buscar
        </button>
      </form>

      <div className="flex gap-4 justify-center flex-wrap">
        {data?.content?.map((item: Pessoa) => (
          <PersonCard {...item} />
        ))}
      </div>
    </div>
  );
}
