import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffPage.css';

function StaffPage() {
  const navigate = useNavigate();
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', position: '', photo: null });

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

  const handleFileChange = (e) => {
    setNewStaff(prevState => ({ ...prevState, photo: e.target.files[0] }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newStaff.name);
    formData.append('position', newStaff.position);
    formData.append('photo', newStaff.photo);

    fetch('http://localhost:5000/staff', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setStaffMembers(prevState => [...prevState, data]);
        setNewStaff({ name: '', position: '', photo: null });
      })
      .catch(error => console.error('Error adding staff member:', error));
  };

  return (
    <div className="staff-page">
      <div className="left-container">
        <h1>List of Staff Members</h1>
        <ul>
          {staffMembers.map((staff, index) => (
            <li key={index}>
              {staff.name} - {staff.position}
              {staff.photo && (
                <img 
                  src={`http://localhost:5000/uploads/${staff.photo}`} 
                  alt={`Profile of ${staff.name}`} 
                  style={{ width: '100px', height: '100px' }} 
                />
              )}
            </li>
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
          <div>
            <label>Photo:</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
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
