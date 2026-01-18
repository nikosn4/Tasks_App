import { useState } from 'react';

// 1. We receive a prop so we can tell App.jsx to go back to the login screen
function Register({ onShowLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // For a success message

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // 2. We call the 'register' endpoint
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                // 3. If the backend sends an error (e.g., "Username already exists")
                throw new Error(data.message);
            }

            // 4. If registration is successful
            setSuccess("User created successfully! Please log in.");
            setUsername('');
            setPassword('');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register New User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
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
            <button type="submit">Register</button>

            {/* 5. A link to go back to the login form */}
            <p>
                Already have an account?
                <button type="button" onClick={onShowLogin}>Log In</button>
            </p>
        </form>
    );
}

export default Register;