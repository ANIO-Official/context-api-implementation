import { useContext, useState, type ReactNode } from "react"
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

    //Enable editing upon clicking edit button or double click task
    const enableEditing = (event:React.MouseEvent<HTMLParagraphElement | HTMLButtonElement>) =>{
        setDataValue(prevData => ({...prevData, isEditing:true})) 
    }

    //confirm changes upon pressing enter in the input element or clicking off the input element
    const handleConfirm = (event:React.KeyboardEvent<HTMLInputElement> &  React.FocusEvent<HTMLDivElement>)=>{
        //Stop editing when enter is pressed or the event target changes from the editing input field
        if(event.key === 'Enter' || !event.currentTarget.classList.contains('edit-item') ){
            editTodo(todo.id, dataValue.editText) //change values of particular task
            setDataValue(prevData => ({...prevData, isEditing:false}))
        }
    }

    const handleDeletion = () =>{
        deleteTodo(todo.id)
    }

    return (
        <>  {
                dataValue.isEditing? 
                <div className="todo-item-container" onBlur={handleConfirm}>
                    <input className="edit-item" onChange={handleChangeInput} onKeyUp={handleConfirm} type="text" name='editText' value={dataValue.editText}/>
                </div> : 
                <div className="todo-item-container">
                    <div className="todo-check-and-item">
                        <input type='checkbox' onChange={handleChangeInput} className="tick-compeleted" name="completed" checked={dataValue.completed}/>
                        <p className="todo-item" onDoubleClick={enableEditing}>{todo.text}</p>
                    </div>
                    
                    <div className="todo-item-buttons">
                         <button onClick={enableEditing} className="edit-button">✏️</button>
                        <button onClick={handleDeletion} className="delete-button">🗑️</button>
                    </div>

                </div>
                
                }

        </>
    )
}