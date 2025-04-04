/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import api from "../services/axiosConfig";

interface FetchParams {
  [key: string]: any;
}

const fetchData = async (endpoint: string, params?: FetchParams) => {
  const { data } = await api.get("https://abitus-api.geia.vip" + endpoint, {
    params: params,
  });
  return data;
};

export const useFetchData = <T>(
  key: string,
  endpoint: string,
  params?: FetchParams,
) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: () => fetchData(endpoint, params),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
  });
};
