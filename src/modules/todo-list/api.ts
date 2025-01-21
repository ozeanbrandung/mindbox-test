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

// const SortToUrlMap = {
//   [Sort.DEFAULT]: '',
//   [Sort.ACTIVE]: '?isCompleted=false',
//   [Sort.COMPLETED]: '?isCompleted=true'
// }

export const todoListApi = {
  baseKey: "todos",
  
  getTodoListQueryOptions: (/*sort: Sort = Sort.DEFAULT*/) => {
    //const urlParam = SortToUrlMap[sort];
    return queryOptions({
        queryKey: [todoListApi.baseKey, 'list'],
        queryFn: meta =>
          apiInstance<TodoDto>('/todos',
            //`/todos${urlParam}`,
            {
              signal: meta.signal
            }
          )
    });
  },

  createTodo: (data: TodoDto) => {
    return apiInstance<TodoDto>(`/todos`, {
      method: "POST",
      json: data
    });
  },

  updateTodo: (data: Partial<TodoDto> & { id: string }) => {
    return apiInstance<TodoDto>(`/todos/${data.id}`, {
      method: "PATCH",
      json: data
    });
  },

  deleteTodos: (data: Partial<TodoDto>[]) => {
    const requests = data.map((todo) => {
      return apiInstance(`/todos/${todo.id}`, {
        method: "DELETE",
      });
    })

    return Promise.all(requests)
  }
}