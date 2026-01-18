// src/components/TaskForm.jsx

import { useState } from 'react';

// 1. We receive the 'onAddTask' function as a prop from the App component.
function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title.trim()) return; // Don't add empty tasks

        // 2. Instead of console.log, we now call the function from App.jsx!
        // This sends the title "up" to the parent component.
        onAddTask(title);

        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;