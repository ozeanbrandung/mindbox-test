import styles from './todo-list.module.scss';
import { useGetTodoList } from './use-get-todo-list';

// const todos = [
//     { id: 1, text: 'Learn React', isCompleted: false },
//     { id: 2, text: 'Learn Vue', isCompleted: false },
//     { id: 3, text: 'Learn Angular', isCompleted: false },
// ]

export function TodoList() {

    const {todos} = useGetTodoList();

  return (
   <section className={styles.todoList}>
        <h1 className={styles.title}>todos</h1>

        <div className={styles.border}>
            <input className={styles.input} type="text" placeholder="What needs to be done?" />
            
            <ul className={styles.list}>
                {todos?.map((todo) => (
                 <li className={styles.item} key={todo.id}>
                    <input type="checkbox" checked={todo.isCompleted} />
                    <span>{todo.text}</span>
                </li>
             ))}
            </ul>
            <footer className={styles.footer}>
                <span className={styles.left}>0 left</span>
                <ul className={styles.filters}>
                    <li className={styles.filter} tabIndex={0}>All</li>
                    <li className={styles.filter} tabIndex={0}>Active</li>
                    <li className={styles.filter} tabIndex={0}>Completed</li>
                </ul>
                <button className={styles.clear}>Clear Completed</button>
            </footer>
        </div>
   </section>
  );
}