import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        setLoginStatus('Login successful');
      } else {
        setLoginStatus('Invalid credentials');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setLoginStatus('Internal Server Error');
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={handleLogin}>
        Login
      </button>

      <p>{loginStatus}</p>
    </div>
  );
}

export default App;
