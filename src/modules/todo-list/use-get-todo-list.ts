import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export function useGetTodoList() {
  const { data: todos, refetch } = useQuery({
    ...todoListApi.getTodoListQueryOptions() ,
    select: data => [...data].reverse()
  });



  return { todos, refetch };
}