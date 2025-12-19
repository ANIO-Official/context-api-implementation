/* Types */
export type Completed = true | false;

/* Object Shapes | Interfaces */

export interface Todo {
  id: string;
  text: string;
  completed: Completed;
}

export interface TodoContextType{
  todos: Todo[]
  addTodo: (todo: Todo) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, newText: string) => void
  clearCompleted: () => void
}

export interface FilterContextType{
  setFilter: (filter:string) => void
}

export interface ThemeContextType{
  toggleTheme: () => void
}

export interface TodoFormProps {
  // onSubmit: (newTask: Task) => void; //Adding tasks to tasks array in parent Dashboard recieve via context
  // updateFilteredDefault: (newTask: Task) => void; //Adding tasks to the filtered array in parent Dashboard. recieve via context
} 

export interface TodoItemProps {
  todo: Todo; //Recieve from TaskList Component. useContext context not needed in this situationally.
  // onChange: (taskID: string, name: string, value: string) => void; //Add change event to selects for all items recieve via context
  // onDelete: (taskID:string) => void //Delete task, send ID to parent  recieve via context
}

export interface TodoListProps {
  // tasks: Task[]; //only uses this to make task li recieve via context
  // onChange: (taskID: string, name: string, value: string) => void; //--- Prop drilling, instead use Context API
  // onDelete: (taskID:string) => void //--- Prop drilling, instead use Context API
}

export interface TodoFilterProps {
  // onFilter: (value: string, filterType: string) => void; //send back filter value to set state ---set via Context now
  // tasks: Task[]; recieve via context
}
