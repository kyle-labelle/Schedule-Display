import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffPage.css';

function StaffPage() {
  const navigate = useNavigate();
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', position: '' });

  useEffect(() => {
    fetch('http://localhost:5000/staff')
      .then(response => response.json())
      .then(data => setStaffMembers(data))
      .catch(error => console.error('Error fetching staff members:', error));
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStaff),
    })
      .then(response => response.json())
      .then(data => {
        setStaffMembers(prevState => [...prevState, data]);
        setNewStaff({ name: '', position: '' });
      })
      .catch(error => console.error('Error adding staff member:', error));
  };

  return (
    <div className="staff-page">
      <div className="left-container">
        <h1>List of Staff Members</h1>
        <ul>
          {staffMembers.map((staff, index) => (
            <li key={index}>{staff.name} - {staff.position}</li>
          ))}
        </ul>
      </div>
      <div className="right-container">
        <h1>Add new Staff Member</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newStaff.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={newStaff.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Staff Member</button>
        </form>
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default StaffPage;
