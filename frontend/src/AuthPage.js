import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './AuthPage.css'; // REMOVED

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // Simulate login success
    navigate('/dashboard');
  };

  return (
    <div className="page-background">
      <div className="form-container">
        <h1>Login / Sign up</h1>
        <form onSubmit={handleLogin}>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
        <p>
          <Link to="/signup">Create an account</Link>
        </p>
        <p>
          Are you a farmer? <Link to="/membership">Request a membership</Link>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;