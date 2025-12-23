import { useContext } from "react"
import { FilterContext, TodoContext } from "../../contexts/contexts"

export default function TodoFilters(){
    const {setFilter} = useContext(FilterContext)
    const {filteredTodos} = useContext(TodoContext)
    

    return (
        <>
            <div className="todo-filter-buttons">
                    {/*Show all todo*/}
                    <button className="all-button" value='all'  name="">All</button>
                    {/*Show all todo with compeleted ==== false */}
                    <button className="active-button" value='active'  name="">Active</button>
                    {/*Show all todo with compeleted ==== true */}
                    <button className="completed-button" value='compeleted'  name="">Completed</button>
                </div>   
        
        </>
    )
}