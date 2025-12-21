import { useMemo, useState, type ReactNode } from "react"
import { FilterContext, ThemeContext, TodoContext } from "../contexts/contexts"
import type { FilterContextType, ThemeContextType, Todo, TodoContextType } from "../types"


interface TodoProviderProps {
    children: ReactNode
}

export default function TodoProviders({ children }: TodoProviderProps) {
    //Set Todos & Filtered Todos base values
    const [todos, setTodos] = useState<Todo[]>([])
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([...todos]) // Shallow copy for displaying

    //Create & Read new Todos & update values accordingly
    const addTodo = (todo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, todo]) //Add new todo to state, data stored
        setFilteredTodos((prevTodos) => [...prevTodos, todo])  //Add new todo to state, shown
    }

    //Update/Editing Todos
    const editTodo = (id: string, newText: string) =>{
        setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? { ...todo, text: newText } : todo)) //edit main data
        setFilteredTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? { ...todo, text: newText } : todo))//update filtered data as well
    }

    //Deleting Todos
    const deleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id)) //return all but the one to delete
        setFilteredTodos([...todos]) //update filtered todos to the todos new value array 
    }
 
    //Clear all completed todos
    const clearCompleted = () => setTodos(prevTodos => prevTodos.filter((todo) => todo.completed !== true)) //only return active todos
   

    //Setting Filter Value & Updating the Filters
    const [filters, setFilters] = useState('') //all(''), active, completed
    const setFilter = (filter: string) => setFilters(filter)

    //Setting Theme & Updating Theme
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'))

    //All Context Values
    const todoContextValue: TodoContextType = useMemo(() => ({ todos, filteredTodos, addTodo, deleteTodo, editTodo, clearCompleted }), [todos, filteredTodos])
    const filterContextValue: FilterContextType = useMemo(() => ({ setFilter }), [filters])
    const themeContextValue: ThemeContextType = useMemo(() => ({ theme, toggleTheme }), [theme])


    return (
        <>
            <TodoContext.Provider value={todoContextValue}>
                <FilterContext.Provider value={filterContextValue}>
                    <ThemeContext.Provider value={themeContextValue}>
                        {children}
                    </ThemeContext.Provider>
                </FilterContext.Provider>
            </TodoContext.Provider>

        </>
    )
}