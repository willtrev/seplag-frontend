import { useFetchData } from "@/hooks/useFetchData";
import { usePostFormData } from "@/hooks/usePostData";
import { handleDateFormat } from "@/utils/handleDateFormat";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export type Pessoa = {
  id: number;
  nome: string;
  idade: string | number;
  urlFoto: string;
  ultimaOcorrencia: {
    ocoId: number;
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

interface FormInputs {
  informacao: string;
  descricao: string;
  foto: FileList;
  data: string;
}

export default function Report() {
  const { id } = useParams();
  const { data } = useFetchData<Pessoa>(`pessoa-${id}`, `/v1/pessoas/${id}`);
  const { register, handleSubmit } = useForm<FormInputs>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const lastReportId = data?.ultimaOcorrencia?.ocoId;

  const notFound = !data?.ultimaOcorrencia.dataLocalizacao;
  const today = new Date().toISOString().split("T")[0];

  const mutation = usePostFormData();

  const onSubmit = async (data: FormInputs) => {
    const formData = {
      informacao: data.informacao,
      descricao: data.descricao,
      data: data.data,
      ocoId: JSON.stringify((lastReportId || 0) + 1),
      foto: data.foto[0],
    };

    mutation.mutate(
      {
        endpoint: "/v1/ocorrencias/informacoes-desaparecido",
        body: formData,
      },
      {
        onSuccess: () => {
          toast.success("Informação enviada com sucesso!");
        },
        onError: (error) => {
          toast.error("Erro: " + error);
        },
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="h-24 flex items-center justify-center">
        <h1 className="text-xl font-medium">Pessoas desaparecidas - MT</h1>
      </div>

      <h2 className="text-lg mt-4 text-center mb-4 font-medium">
        Envio de informações
      </h2>

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-80"
        >
          <label className="flex flex-col">
            <span className="text-sm text-gray-900">
              Informações a respeito da visualização da Pessoa:
            </span>
            <textarea
              className="p-2 bg-white border border-gray-300 rounded-md"
              {...register("informacao")}
              placeholder="Informação"
              required
              rows={4}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-900">Data:</span>
            <input
              className="p-1 bg-white border border-gray-300 rounded-md"
              {...register("data")}
              type="date"
              required
              max={today}
            />
          </label>

          <label className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-1 cursor-pointer">
            <span className="text-center">
              {selectedImage ? "Alterar foto" : "Anexar foto"}
            </span>
            <input
              className="text-transparent h-0"
              {...register("foto")}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {selectedImage && (
              <div className="mt-4 self-center">
                <img
                  src={selectedImage}
                  alt="Visualização da Foto"
                  className="max-w-full max-h-48 object-cover rounded-md"
                />
              </div>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-900">Descrição do Anexo:</span>
            <textarea
              className="p-2 bg-white border border-gray-300 rounded-md"
              {...register("descricao")}
              placeholder="Descrição"
              required
              rows={4}
            />
          </label>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            {mutation.isPending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
