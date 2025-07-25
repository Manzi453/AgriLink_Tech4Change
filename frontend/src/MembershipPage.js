import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MembershipPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    farmName: '',
    cropTypes: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        type: "FARMER" // Enum value as expected in backend
      };
      await axios.post('https://your-backend-url.com/auth/apply/farmer', payload);
      alert("Membership request submitted!");
      navigate('/dashboard');
    } catch (err) {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Request Membership</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="farmName" placeholder="Farm Name" onChange={handleChange} required />
        <input name="cropTypes" placeholder="Crop Types (e.g. maize, beans)" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MembershipPage;

