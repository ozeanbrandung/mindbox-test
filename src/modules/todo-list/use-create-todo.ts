import { nanoid } from "nanoid";
import { TodoDto, todoListApi } from "./api";
import { MutationObserver } from "@tanstack/react-query";
import { queryClient } from "../../app/api/query-client";


export function useCreateTodo() {

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = e.target.value.trim() ?? "";

    const newTodo: TodoDto = {
        id: nanoid(),
        isCompleted: false,
        text: `${text}`,
      };

      try {
        await new MutationObserver(queryClient, {
          mutationFn: todoListApi.createTodo
        }).mutate(newTodo);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        const prevTasks = queryClient.getQueryData(
            todoListApi.getTodoListQueryOptions().queryKey
          );

        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          prevTasks
        );
      } finally {
        queryClient.invalidateQueries({
          queryKey: [todoListApi.baseKey]
        });
      }

    e.target.value = "";
  };

  return {
    handleCreate,
  };
}