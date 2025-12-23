import { useContext } from "react"
import { FilterContext, TodoContext } from "../../contexts/contexts"
import TodoItem from "../TodoItem/TodoItem"



export default function TodoList(){
    const {filteredTodos, todos, clearCompleted} = useContext(TodoContext)
    const toDones = todos.filter((todo) => todo.completed === true).length
    const stillActive = todos.filter((todo) => todo.completed === false).length


    return(
        <>
            <ul className="todo-list">
                {/*Tasks <li> Creation, Prop Passing*/}
                {
                    filteredTodos.map((todo) => (
                        <li className="todo-list-item" key={todo.id}>
                            <TodoItem 
                            todo={todo}/>
                        </li>
                    ))
                }
            </ul>
            <div className="clear-completed-container">
                <p className="todo-left">{stillActive === 1? '1 item': `${stillActive} items`} left</p>
                <button onClick={clearCompleted} className="clear-completed-button">Clear Completed ({toDones})</button>
            </div>
        </>
    )
}