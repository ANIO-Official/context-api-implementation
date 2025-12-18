import TaskFilters from "./TasksFilters";
import TaskForm from "./TasksForm";
import TaskList from "./TasksList";
import ThemeSwitcherButton from "./ThemeSwitcherButton";


export default function TodoApp(){
    return(
        <>
            <div className="todo-app">
                <h2>Todo App (Context API)</h2>
                <ThemeSwitcherButton/>
                <TaskForm/>
                <TaskFilters/>
                <TaskList/>
            </div>
        </>
    )
}