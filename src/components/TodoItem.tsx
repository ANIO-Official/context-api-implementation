import { useContext, useState } from "react"
import type { TodoItemProps } from "../types"
import { TodoContext } from "../contexts/contexts"


export default function TodoItem({todo}:TodoItemProps){
    const {editTodo, deleteTodo} = useContext(TodoContext)
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)


    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const editText = event.target.value
        setEditText(editText)
    }


    const handleEdit = (event:React.MouseEvent<HTMLParagraphElement | HTMLButtonElement>) =>{
        const target = event.currentTarget

        setIsEditing(true) //Set to true on both events so the edit input shows
        editTodo(todo.id, editText)
    }

    const handleConfirm = (event:React.KeyboardEvent<HTMLInputElement> &  React.FocusEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            setIsEditing(false)
        }
        else if(event.currentTarget.onblur){
            setIsEditing(false)
        }
    }

    const handleDeletion = () =>{
        deleteTodo(todo.id)
    }

    return (
        <>  {
                isEditing? 
                <div className="todo-item-container">
                    <input className="edit-item" onChange={handleChangeInput} onDoubleClick={handleEdit} onKeyUp={handleConfirm} type="text">{editText}</input>
                </div> : 
                <div className="todo-item-container">
                    <p className="todo-item">{todo.text}</p>
                    <button onClick={handleEdit} className="edit-button">📝</button>
                    <button onClick={handleDeletion} className="delete-button">🗑</button>
                </div>
                
                }

        </>
    )
}