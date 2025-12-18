

export default function TaskFilters(){
    return(
        <>
            <div className="tasks-filter-buttons">
                {/*Show all tasks*/}
                <button className="all-button" value='all'  name="">All</button>
                {/*Show all tasks with compeleted ==== false */}
                <button className="active-button" value='active'  name="">Active</button>
                {/*Show all tasks with compeleted ==== true */}
                <button className="completed-button" value='compeleted'  name="">Completed</button>
            </div>   
        </>
    )
}