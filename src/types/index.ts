/* Types */
export type Completed = true | false;

/* Object Shapes | Interfaces */

export interface Task {
  id: string;
  text: string;
  completed: Completed;
}

export interface TaskFormProps {
  // onSubmit: (newTask: Task) => void; //Adding tasks to tasks array in parent Dashboard recieve via context
  // updateFilteredDefault: (newTask: Task) => void; //Adding tasks to the filtered array in parent Dashboard. recieve via context
} 

export interface TaskItemProps {
  task: Task; //Recieve from TaskList Component. useContext context not needed in this situationally.
  // onChange: (taskID: string, name: string, value: string) => void; //Add change event to selects for all items recieve via context
  // onDelete: (taskID:string) => void //Delete task, send ID to parent  recieve via context
}

export interface TaskListProps {
  // tasks: Task[]; //only uses this to make task li recieve via context
  // onChange: (taskID: string, name: string, value: string) => void; //--- Prop drilling, instead use Context API
  // onDelete: (taskID:string) => void //--- Prop drilling, instead use Context API
}

export interface TaskFilterProps {
  // onFilter: (value: string, filterType: string) => void; //send back filter value to set state ---set via Context now
  // tasks: Task[]; recieve via context
}
export interface Filters {
  completed?: Completed; //filter set to compelted 
}
