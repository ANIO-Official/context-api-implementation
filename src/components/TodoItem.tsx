import { useContext, useState, type ReactNode } from "react"
import type { TodoItemProps } from "../types"
import { TodoContext } from "../contexts/contexts"


export default function TodoItem({ todo }: TodoItemProps) {
    const { editTodo, deleteTodo } = useContext(TodoContext)
    const [dataValue, setDataValue] = useState({
        isEditing: false, //For updating todo from <p> to <input type='text'/>
        editText: todo.text, //For updating todo's value on change when set to an input element.
        completed: false //For toggling if task is completed.
    })

    //Update todo text value on input change. 
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        typeof value === 'string' ?
            //Change value of input text field to it's value
            setDataValue(prevData => ({
                ...prevData,
                [name]: value
            })) : false //return nothing when not a string (when not changing text)
    }

    //Toggle Completed on click. Updates the state variable completed's value
    const handleToggle = () => {
        const newValue = dataValue.completed === true ? false : true
        setDataValue(prevData => ({
            ...prevData,
            completed: newValue //update value visually
        }))
        editTodo(todo.id, newValue)
    }

    //Enable editing upon clicking edit button or double click task
    const enableEditing = (event: React.MouseEvent<HTMLParagraphElement | HTMLButtonElement>) => {
        setDataValue(prevData => ({ ...prevData, isEditing: true }))
    }

    //confirm changes upon pressing enter in the input element or clicking off the input element
    const handleConfirm = (event: React.KeyboardEvent<HTMLInputElement> & React.FocusEvent<HTMLDivElement>) => {
        //Stop editing when enter is pressed or the event target changes from the editing input field
        if (event.key === 'Enter' || !event.currentTarget.classList.contains('edit-item')) {
            editTodo(todo.id, dataValue.editText) //change values of particular task
            setDataValue(prevData => ({ ...prevData, isEditing: false })) //update data
        }
    }

    //Sends Id to the deleteTodo function in the TodoProviders component to delete todo.
    const handleDeletion = () => {
        deleteTodo(todo.id) //return new array of todo not including this particular todo. PERMANENTLY
    }

    return (
        <>  {
            dataValue.isEditing ?
                <div className="todo-item-container" onBlur={handleConfirm}>
                    <input className="edit-item" onChange={handleChangeInput} onKeyUp={handleConfirm} type="text" name='editText' value={dataValue.editText} />
                </div> :
                <div className="todo-item-container">
                    <div className="todo-check-and-item">
                        <input type='checkbox' onClick={handleToggle} className="tick-compeleted" name="completed" checked={dataValue.completed} />
                        {/*Has conditional text decoration when task is marked as completed based on state variable completed. */}
                        <p className={`todo-item ${dataValue.completed? 'completed': 'active'}`} style={{textDecoration:`${dataValue.completed? 'line-through': 'none'}`}} onDoubleClick={enableEditing}>{todo.text}</p>
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