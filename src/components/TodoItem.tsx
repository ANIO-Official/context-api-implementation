import { useContext, useState } from "react"
import type { TodoItemProps } from "../types"
import { TodoContext } from "../contexts/contexts"


export default function TodoItem({todo}:TodoItemProps){
    const {editTodo, deleteTodo} = useContext(TodoContext)
    const [dataValue, setDataValue] = useState({
        isEditing: false,
        editText: todo.text,
        completed: false
    })

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target
        typeof value === 'string'?
        setDataValue(prevData => ({
            ...prevData,
            [name]:value
        })):
        setDataValue(prevData => ({
            ...prevData,
            [name]:!value
        }))
    }

    const handleEdit = (event:React.MouseEvent<HTMLParagraphElement | HTMLButtonElement>) =>{
        setDataValue(prevData => ({...prevData, isEditing:true})) //Set to true on both events so the edit input shows
    }

    const handleConfirm = (event:React.KeyboardEvent<HTMLInputElement> &  React.FocusEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            editTodo(todo.id, dataValue.editText) //change on confirmation of edit (pressing enter)
            setDataValue(prevData => ({...prevData, isEditing:false}))
        }
        if(!event.currentTarget.onblur){
            editTodo(todo.id, dataValue.editText) //change on confirmation of edit (leaving editing on click outside of input)
           setDataValue(prevData => ({...prevData, isEditing:false}))
        }
    }

    const handleDeletion = () =>{
        deleteTodo(todo.id)
    }

    return (
        <>  {
                dataValue.isEditing? 
                <div className="todo-item-container">
                    <input className="edit-item" onChange={handleChangeInput} onBlur={handleConfirm} onKeyUp={handleConfirm} type="text" name='editText' value={dataValue.editText}/>
                </div> : 
                <div className="todo-item-container">
                    <div className="todo-check-and-item">
                        <input type='checkbox' onChange={handleChangeInput} className="tick-compeleted" name="completed" checked={dataValue.completed}/>
                        <p className="todo-item" onDoubleClick={handleEdit}>{todo.text}</p>
                    </div>
                    
                    <div className="todo-item-buttons">
                         <button onClick={handleEdit} className="edit-button">✏️</button>
                        <button onClick={handleDeletion} className="delete-button">🗑️</button>
                    </div>

                </div>
                
                }

        </>
    )
}