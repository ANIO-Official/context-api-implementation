import React from "react";
import type { FilterContextType, ThemeContextType, Todo, TodoContextType } from "../types";


//Create context, set up defaults. Defaults cover ill behavior
const TodoContext = React.createContext<TodoContextType>({
    todos: [],
    addTodo: (todo:Todo) => console.warn('No Todo object provided to add to list.'),
    deleteTodo: (id:string) => console.warn('No Todo ID provided to delete from list.'),
    editTodo: (id:string) => console.warn('No Todo ID provided to edit todo.'),
    clearCompleted: () => console.warn('Nothing to clear. (No todos are completed.)')
})

const FilterContext = React.createContext<FilterContextType>({
    setFilter: (filter:string) => console.warn('No valid filter provided.')
})


const ThemeContext = React.createContext<ThemeContextType>({
    toggleTheme: () => console.warn('Error toggling theme.'),
})