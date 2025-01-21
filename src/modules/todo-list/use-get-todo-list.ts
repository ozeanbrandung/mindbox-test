import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api";
import { useLayoutEffect, useState } from "react";

export enum Sort {
  DEFAULT,
  ACTIVE,
  COMPLETED
}

export function useGetTodoList() {
  const [sort, setSort] = useState(Sort.DEFAULT);
  const [filterdTodos, setFilteredTodos] = useState<TodoDto[]>([]);

  const handleChangeSort = (value: Sort) => {
    setSort(value);
  }

  const { data: todos, refetch, isFetching } = useQuery({
    ...todoListApi.getTodoListQueryOptions(sort) ,
    select: data => [...data].reverse(),
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   refetch();
  // }, [refetch, sort]);

  useLayoutEffect(() => {
    if (sort === Sort.COMPLETED) {
      setFilteredTodos(todos?.filter(item => item.isCompleted))
    }

    if (sort === Sort.ACTIVE) { 
      setFilteredTodos(todos?.filter(item => !item.isCompleted))
    }

    if (sort === Sort.DEFAULT) {
      setFilteredTodos(todos);
    }
  }, [sort, todos]);

  //console.log(filterdTodos);
  

  return { filterdTodos, todos, refetch, handleChangeSort, sort, isFetching };
}