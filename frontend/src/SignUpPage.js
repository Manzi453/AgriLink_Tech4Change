import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Signing up with:', {
      fullName,
      email,
      password,
      phoneNumber,
      location,
    });
   

    navigate('/dashboard');
  };

  return (
    <div className="page-background">
      <div className="form-container">
        <h1>Create Account</h1>
        <form onSubmit={handleSignUp}>
          <input
            className="input-field"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
          <input
            className="input-field"
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Location (City/Region)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <button type="submit" className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;