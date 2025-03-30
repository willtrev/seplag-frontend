import { useMutation } from "@tanstack/react-query";
import api from "../services/axiosConfig";

interface PostParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const postFormData = async (endpoint: string, body: PostParams) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === "string" || value instanceof Blob) {
      formData.append(key, value);
    } else {
      throw new Error(`Unsupported value type: ${typeof value}`);
    }
  });

  const { data } = await api.post(
    "https://abitus-api.geia.vip" + endpoint,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return data;
};

export const usePostFormData = <T>() => {
  return useMutation<T, Error, { endpoint: string; body: PostParams }>({
    mutationFn: ({ endpoint, body }) => postFormData(endpoint, body),
  });
};
