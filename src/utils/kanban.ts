import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

// 对传入的参数进行拼接到url进行请求
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

// 返回一个函数，接收一个params，函数内部发起一个post请求，data是params
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client("kanbans", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 传入一个id，发起delete请求
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
