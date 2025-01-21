import { TodoDto } from "./api";
import styles from "./todo-list.module.scss";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodos } from "./use-delete-todos";
import { Sort, useGetTodoList } from "./use-get-todo-list";
import { useToggleTodo } from "./use-toggle-todo";
import clsx from "clsx";

// const todos = [
//     { id: 1, text: 'Learn React', isCompleted: false },
//     { id: 2, text: 'Learn Vue', isCompleted: false },
//     { id: 3, text: 'Learn Angular', isCompleted: false },
// ]

export function TodoList() {
  const { filterdTodos, todos, handleChangeSort, sort } =
    useGetTodoList();
  const { handleCreate } = useCreateTodo();
  const { toggleTodo } = useToggleTodo();
  const deleteTodos = useDeleteTodos();

  function handleClickEnter(e: React.MouseEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.keyCode === 13) {
      console.log("Enter");
      handleCreate(e);
    }
  }

  const completed: TodoDto[] = todos?.filter((todo) => todo.isCompleted);

  const left: number = Number(todos?.length) - Number(completed?.length);

  return (
    <section className={styles.todoList}>
      <h1 className={styles.title}>todos</h1>

      <div className={styles.border}>
        <input
          className={styles.input}
          type="text"
          placeholder="What needs to be done?"
          onKeyUp={handleClickEnter}
        />

        <ul className={styles.list}>
          {filterdTodos?.map((todo) => (
            <li
              className={clsx(styles.item, {
                [styles.completed]: todo.isCompleted,
              })}
              key={todo.id}
            >
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id, todo.isCompleted)}
              />
              <span className={styles.text}>{todo.text}</span>
            </li>
          ))}
        </ul>
        <footer className={styles.footer}>
          {Boolean(left) && (
            <span className={styles.left}>{`${left} items left`}</span>
          )}
          <ul className={styles.filters}>
            <li
              className={clsx(styles.filter, {
                [styles.active]: sort === Sort.DEFAULT,
              })}
              tabIndex={0}
              onClick={() => handleChangeSort(Sort.DEFAULT)}
            >
              All
            </li>
            <li
              className={clsx(styles.filter, {
                [styles.active]: sort === Sort.ACTIVE,
              })}
              tabIndex={0}
              onClick={() => handleChangeSort(Sort.ACTIVE)}
            >
              Active
            </li>
            <li
              className={clsx(styles.filter, {
                [styles.active]: sort === Sort.COMPLETED,
              })}
              tabIndex={0}
              onClick={() => {
                handleChangeSort(Sort.COMPLETED);
              }}
            >
              Completed
            </li>
          </ul>
          <button
            className={styles.clear}
            onClick={() => {
              deleteTodos.handleDelete(completed);
            }}
            disabled={deleteTodos.isPending}
          >
            Clear Completed
          </button>
        </footer>
      </div>
    </section>
  );
}
