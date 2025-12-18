


export default function TaskForm(){
    return(
        <>
            <form className="simple-task-form-container">
                <input className="task-input" type="text" name="text" value={''}/>
                <button className="task-submit-button" type='submit'>Add Todo</button>
            </form>
        </>
    )
}