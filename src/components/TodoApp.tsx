import TodoList from "./TodoList";
import TodoForm from "./TodoInput";
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import '../styles/styles-todo-app.css'
import TodoFilters from "./TodoFilters";
import { useContext } from "react";
import { ThemeContext } from "../contexts/contexts";


export default function TodoApp() {
    const {theme} = useContext(ThemeContext)
    return (
        <>
                <div className={`todo-app ${theme === 'light'? 'light':'dark'}`}>
                    <h2>Todo App (Context API)</h2>
                    <ThemeSwitcherButton />
                    <TodoForm />
                    <TodoFilters />
                    <TodoList />
                </div>

        </>
    )
}