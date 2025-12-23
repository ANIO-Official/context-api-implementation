import { useMemo, useState, type ReactNode } from "react"
import { FilterContext, ThemeContext, TodoContext } from "../contexts/contexts"
import type { FilterContextType, ThemeContextType, Todo, TodoContextType } from "../types"


interface TodoProviderProps {
    children: ReactNode
}

export default function TodoProviders({ children }: TodoProviderProps) {

    //Getting the intiial values from Local Storage (Happens once on load)
    //Return stored data or defaults
    const stringLocalData = { 
        todos: getData('todos')? localStorage.getItem('todos'):'[]',  //check for data and return if found or use initial value
        theme: getData('theme')? localStorage.getItem('theme') : 'light'} //check for data and return if found or use initial value
    const parsedLocalData = { 
        todos: stringLocalData.todos && JSON.parse(stringLocalData.todos),//ensure data is returned and not null for rendering
        theme: stringLocalData.theme? stringLocalData.theme : 'light'}//ensure data is returned and not null for rendering

    //Set Todos & Filtered Todos base values
    const [todos, setTodos] = useState<Todo[]>(parsedLocalData.todos)
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([...todos]) // Shallow copy for displaying


    //Create & Read new Todos & update values accordingly
    const addTodo = (todo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, todo]) //Add new todo to state, data stored
        setFilteredTodos((prevTodos) => [...prevTodos, todo])  //Add new todo to state, shown
    }

    //Update/Editing Todos
    const editTodo = (id: string, newValue: string | boolean) => {
        setTodos((prevTodos) => prevTodos.map((todo) =>
            todo.id === id && typeof newValue === 'string' ? { ...todo, text: newValue } :
                todo.id === id && typeof newValue === 'boolean' ? { ...todo, completed: newValue } :
                    todo)) //edit main data. Change text when new value is string, change completed when new value is boolean
        setFilteredTodos((prevTodos) => prevTodos.map((todo) =>
            todo.id === id && typeof newValue === 'string' ? { ...todo, text: newValue } :
                todo.id === id && typeof newValue === 'boolean' ? { ...todo, completed: newValue } :
                    todo))//update filtered data as well
    }

    //Deleting Todos
    const deleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id)) //return all but the one to delete
        setFilteredTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id)) //update filtered todos base value as well
    }

    //Clear all completed todos
    const clearCompleted = () => {
        //only return active todos
        setTodos(prevTodos => prevTodos.filter((todo) => todo.completed !== true))
        setFilteredTodos(prevTodos => prevTodos.filter((todo) => todo.completed !== true))
    }

    //Setting Filter Value & Updating the Filters
    const [filters, setFilters] = useState('') //all(''), active, completed
    const setFilter = (filter: string) => setFilters(filter)

    //Setting Theme & Updating Theme
    const [theme, setTheme] = useState(parsedLocalData.theme)
    const toggleTheme = () => {
        setTheme((prevTheme: any) => (prevTheme === 'light' ? 'dark' : 'light'))
        // setLocalData(prevData => ({...prevData, savedTheme: theme}))
    }

    //Saving to Local Storage, derived from state. Will update local storage as the state of these update.
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('theme', theme)

    //Check if there is data in local storage for key and if the window is defined/exit
    function getData(key:string) {
        if (typeof window !== "undefined") {
            if (localStorage.getItem(key)) {
                return true;
            }
        }
        return false;
    }

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