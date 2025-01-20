import { queryOptions } from "@tanstack/react-query";
import { apiInstance } from "../../app/api/api-instance";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type TodoDto = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export const todoListApi = {
  baseKey: "todos",
  getTodoListQueryOptions: () => {
    return queryOptions({
        queryKey: [todoListApi.baseKey, 'list'],
        queryFn: meta =>
          apiInstance<TodoDto>(
            `/todos`,
            {
              signal: meta.signal
            }
          )
    });
  },
}