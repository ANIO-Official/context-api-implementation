import { useContext } from "react"
import { FilterContext, TodoContext } from "../../contexts/contexts"

export default function TodoFilters(){
    const {setFilter} = useContext(FilterContext)
    const handleFiltering = (event: React.MouseEvent<HTMLButtonElement>) =>{
        const {name} = event.currentTarget
        setFilter(name) //set the filter to the name of the target. (Names match filter if else statements)
    }

    return (
        <>
            <div className="todo-filter-buttons">
                    {/*Show all todo*/}
                    <button onClick={handleFiltering} className="all-button" value='all'  name="all">All</button>
                    {/*Show all todo with compeleted ==== false */}
                    <button onClick={handleFiltering} className="active-button" value='active'  name="active">Active</button>
                    {/*Show all todo with compeleted ==== true */}
                    <button onClick={handleFiltering} className="completed-button" value='compeleted'  name="completed">Completed</button>
                </div>   
        
        </>
    )
}