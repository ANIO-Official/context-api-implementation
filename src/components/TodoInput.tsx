import { useContext, useState } from "react"
import { TodoContext } from "../contexts/contexts"
import type { Todo } from "../types"



export default function TodoForm(){
    const {addTodo} = useContext(TodoContext)
    const [text, setText] = useState('')

    const formValidation = text.trim() !== '' //On valid when there is text.

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const inputText = event.target.value
        setText(inputText)
    }

    const handleAddTodo = (event: React.SyntheticEvent<HTMLFormElement>) =>{
        event?.preventDefault()
        //check if field is valid
        if (!formValidation){
            return alert(`You haven't entered anything! Nice try.🤨`)
        }

        //Create Todo
        const newId:string = `${text[0]}${Date.now()}`
        const newTodo:Todo = {
            id: newId,
            text: text,
            completed: false
        }
        const form = event.currentTarget
        const newTodoForm = new FormData(form)
        addTodo(newTodo)
        form.reset()
        alert('New Todo Added! Look at that prodcutivity! 🎉')
    }

    return(
        <>
            <form onSubmit={handleAddTodo} className="simple-todo-form-container">
                <input onChange={handleInputChange} className="todo-input" type="text" name="text" value={text}/>
                <button className="todo-submit-button" type='submit'>Add Todo</button>
            </form>
        </>
    )
}