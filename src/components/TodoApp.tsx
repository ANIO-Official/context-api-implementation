import TodoList from "./TodoList";
import TodoForm from "./TodoInput";
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import '../styles/styles-todo-app.css'
import { useState } from "react";
import type { Todo } from "../types";


export default function TodoApp(){
    const [todos, setTodos] = useState<Todo[]>([])


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