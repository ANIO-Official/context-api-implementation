import TodoList from "./TodoList";
import TodoForm from "./TodoInput";
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import '../styles/styles-todo-app.css'
import { use, useState, type ReactNode } from "react";
import type { Todo } from "../types";

interface TodoAppProviderProps{
    children: ReactNode
}

export default function TodoApp(){
    const [todos, setTodos] = useState<Todo[]>([])
    const addTodo = (todo:Todo) => setTodos((prevTodos) => [...prevTodos, todo]) //Add new todo to state, data
    const deleteTodo = (id: string) => setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id)) //return all but the one to delete
    const editTodo = (id: string, newText:string) => setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id? {...todo, text: newText}: todo))
    const clearCompleted = () => setTodos(prevTodos => prevTodos.filter((todo) => todo.completed !== true)) //only return active todos
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([...todos]) // Shallow copy for displaying
    const [filters, setFilters] = useState('') //all(''), active, completed
    const setFilter = (filter:string) => setFilters(filter)
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => setTheme((prevTheme:string) => (prevTheme === 'light'? 'dark':'light'))


    return(
        <>
            <div className="todo-app">
                <h2>Todo App (Context API)</h2>
                <ThemeSwitcherButton/>
                <TodoForm/>
                <div className="todo-filter-buttons">
                    {/*Show all todo*/}
                    <button className="all-button" value='all'  name="">All</button>
                    {/*Show all todo with compeleted ==== false */}
                    <button className="active-button" value='active'  name="">Active</button>
                    {/*Show all todo with compeleted ==== true */}
                    <button className="completed-button" value='compeleted'  name="">Completed</button>
                </div>   
                <TodoList/>
            </div>
        </>
    )
}