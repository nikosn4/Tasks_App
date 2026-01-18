import { useState } from 'react';

// 1. Receive the new 'onShowRegister' prop
function Login({ onLoginSuccess, onShowRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // ... (handleSubmit function is unchanged) ...
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            const data = await response.json();
            onLoginSuccess(data.token);
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* ... (username and password inputs are unchanged) ... */}
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit">Login</button>

            {/* 2. ADD THIS PARAGRAPH and button */}
            <p>
                Don't have an account?
                <button type="button" onClick={onShowRegister}>Register</button>
            </p>
        </form>
    );
}

export default Login;
