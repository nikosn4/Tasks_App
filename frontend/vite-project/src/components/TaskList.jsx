// src/components/TaskList.jsx

// 1. Receive onToggleTask
function TaskList({ tasks, onDeleteTask, onToggleTask }) {
    return (
        <div>
            <h2>My Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {/* 2. Add a checkbox */}
                        <input
                            type="checkbox"
                            checked={task.completed} // The box is checked if task.completed is true
                            onChange={() => onToggleTask(task._id, task.completed)} // Call the function on change
                        />
                        <span>{task.title}</span>
                        <button onClick={() => onDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;