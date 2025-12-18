


export default function TodoForm(){
    return(
        <>
            <form className="simple-todo-form-container">
                <input className="todo-input" type="text" name="text" value={''}/>
                <button className="todo-submit-button" type='submit'>Add Todo</button>
            </form>
        </>
    )
}