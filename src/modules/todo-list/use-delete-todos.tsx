import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";

export function useDeleteTodos() {
  const queryClient = useQueryClient();

  const deleteTodosMutation = useMutation({
    mutationFn: todoListApi.deleteTodos,
    async onSettled() {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    },
    async onSuccess(_, deletedData) {
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        todos => todos?.filter(todo => deletedData.find(deleted => deleted.id === todo.id))
      );
    }
  });

  return {
    handleDelete: deleteTodosMutation.mutate,
    isPending: deleteTodosMutation.isPending,
  };
}