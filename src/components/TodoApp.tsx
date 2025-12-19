import TodoList from "./TodoList";
import TodoForm from "./TodoInput";
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import '../styles/styles-todo-app.css'
import { use, useMemo, useState, type ReactNode } from "react";
import type { FilterContextType, ThemeContextType, Todo, TodoContextType } from "../types";
import { FilterContext, ThemeContext, TodoContext } from "../contexts/contexts";
import TodoFilters from "./TodoFilters";

interface TodoAppProviderProps {
    children: ReactNode
}

export default function TodoApp({ children }: TodoAppProviderProps) {
    const [todos, setTodos] = useState<Todo[]>([])
    const addTodo = (todo: Todo) => setTodos((prevTodos) => [...prevTodos, todo]) //Add new todo to state, data
    const deleteTodo = (id: string) => setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id)) //return all but the one to delete
    const editTodo = (id: string, newText: string) => setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? { ...todo, text: newText } : todo))
    const clearCompleted = () => setTodos(prevTodos => prevTodos.filter((todo) => todo.completed !== true)) //only return active todos
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([...todos]) // Shallow copy for displaying
    const todoContextValue:TodoContextType = useMemo(() => ({ todos, filteredTodos, addTodo, deleteTodo, editTodo, clearCompleted }), [todos, filteredTodos]) 
    
    const [filters, setFilters] = useState('') //all(''), active, completed
    const setFilter = (filter: string) => setFilters(filter)
    const filterContextValue: FilterContextType = useMemo(() => ({setFilter}), [filters])

    const [theme, setTheme] = useState('light')
    const toggleTheme = () => setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'))
    const themeContextValue: ThemeContextType = useMemo(() => ({toggleTheme}), [theme])

    return (
        <>
            <TodoContext.Provider value={todoContextValue}>
                <FilterContext.Provider value={filterContextValue}>
                    <ThemeContext.Provider value={themeContextValue}>
                        <div className={`todo-app ${theme === 'light'? 'light':'dark'}`}>
                            <h2>Todo App (Context API)</h2>
                            <ThemeSwitcherButton />
                            <TodoForm />
                            <TodoFilters />
                            <TodoList />
                        </div>
                    </ThemeContext.Provider>
                </FilterContext.Provider>
            </TodoContext.Provider>
        </>
    )
}