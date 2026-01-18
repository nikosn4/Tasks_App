import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const API_BASE = 'http://localhost:3001/api';

function App() {
    const [token, setToken] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [showRegister, setShowRegister] = useState(false);


    useEffect(() => {
        const fetchTasks = async () => {
            if (!token) return;

            try {
                const response = await fetch(`${API_BASE}/tasks`, {
                    headers: {
                        'x-auth-token': token //sends key at auth
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setTasks(data);
                } else {
                    console.error("Failed to fetch tasks:", data.message);
                    setToken(null);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [token]);

    const addTask = async (title) => {
        try {
            const response = await fetch(`${API_BASE}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ title: title }),
            });
            const data = await response.json();
            setTasks([...tasks, data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`${API_BASE}/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': token // Send the key
                }
            });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleTask = async (id, currentStatus) => {
        try {
            const response = await fetch(`${API_BASE}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Send the key
                },
                body: JSON.stringify({ completed: !currentStatus }),
            });
            const updatedTask = await response.json();
            setTasks(tasks.map(task =>
                task._id === id ? updatedTask : task
            ));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const logout = () => {
        setToken(null);
    };

    if (!token) {

        return (
            <div>
                {showRegister ? (

                    <Register onShowLogin={() => setShowRegister(false)} />
                ) : (

                    <Login
                        onLoginSuccess={setToken}
                        onShowRegister={() => setShowRegister(true)}
                    />
                )}
            </div>
        )
    }

    // SCENARIO 2: User is LOGGED IN (This part is unchanged)
    return (
        <div>
            <Header onLogout={logout} />
            <main>
                <TaskForm onAddTask={addTask} />
                <TaskList
                    tasks={tasks}
                    onDeleteTask={deleteTask}
                    onToggleTask={toggleTask}
                />
            </main>
        </div>
    )
}

export default App