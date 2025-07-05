import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MembershipPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [cropTypes, setCropTypes] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [motivation, setMotivation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Membership form submitted with:', {
      fullName,
      email,
      password,
      phoneNumber,
      location,
      cropTypes,
      yearsOfExperience,
      motivation,
    });
    // In a real application, you would send this data to your backend API for membership request.
    // fetch('/api/membership-request', { ... });
    alert('Membership request submitted!');
    navigate('/');
  };

  return (
    <div className="page-background">
      <div className="form-container">
        <h1>Membership Form</h1>
        <form onSubmit={handleSubmit}>
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
          <input
            className="input-field"
            type="text"
            placeholder="Crop Types (e.g., Maize, Beans)"
            value={cropTypes}
            onChange={(e) => setCropTypes(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="number"
            placeholder="Years of Experience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            min="0"
            required
          />
          <textarea
            className="input-field"
            placeholder="Motivation (Why do you want to join?)"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            rows="4"
            required
          ></textarea>
          <button type="submit" className="btn">Request Membership</button>
        </form>
      </div>
    </div>
  );
}

export default MembershipPage;