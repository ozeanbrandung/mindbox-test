import styles from './todo-list.module.scss';
import { useCreateTodo } from './use-create-todo';
import { useGetTodoList } from './use-get-todo-list';
import { useToggleTodo } from './use-toggle-todo';
import clsx from 'clsx';

// const todos = [
//     { id: 1, text: 'Learn React', isCompleted: false },
//     { id: 2, text: 'Learn Vue', isCompleted: false },
//     { id: 3, text: 'Learn Angular', isCompleted: false },
// ]

export function TodoList() {

    const {todos} = useGetTodoList();
    const {handleCreate} = useCreateTodo();
    const { toggleTodo } = useToggleTodo();

    function handleClickEnter(e: React.MouseEvent<HTMLInputElement>) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            console.log('Enter');
            handleCreate(e);
        }
    }

    const left = todos?.filter((todo) => !todo.isCompleted).length;

  return (
   <section className={styles.todoList}>
        <h1 className={styles.title}>todos</h1>

        <div className={styles.border}>
            <input className={styles.input} type="text" placeholder="What needs to be done?" onKeyUp={handleClickEnter}/>
            
            <ul className={styles.list}>
                {todos?.map((todo) => (
                 <li className={clsx(styles.item, {[styles.completed]: todo.isCompleted})} key={todo.id}>
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
                <span className={styles.left}>{`${left} items left`}</span>
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