import { useContext, useState } from "react"
import type { TodoItemProps } from "../types"
import { TodoContext } from "../contexts/contexts"


export default function TodoItem({todo}:TodoItemProps){
    const {editTodo, deleteTodo} = useContext(TodoContext)
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)

    const handleEdit = (event:React.MouseEvent<HTMLParagraphElement | HTMLButtonElement>) =>{
        const target = event.currentTarget

        if 
    }

    return (
        <>  {
                isEditing? 
                <div className="todo-item-container">
                    <input type="text">{todo.text}</input>
                </div> : 
                <div className="todo-item-container">
                    <p className="todo-item">{todo.text}</p>
                    <button>📝</button>
                    <button>🗑</button>
                </div>
                
                }

        </>
    )
}