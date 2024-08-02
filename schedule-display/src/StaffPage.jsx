import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffPage.css';

function StaffPage() {
  const navigate = useNavigate();
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', position: '', photo: null });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, name: '' });

  useEffect(() => {
    fetch('http://localhost:5000/staff')
      .then(response => response.json())
      .then(data => setStaffMembers(data))
      .catch(error => console.error('Error fetching staff members:', error));
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleEventPageClick = () => {
    navigate('/event');
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

  const handleDelete = (name) => {
    fetch(`http://localhost:5000/staff/${name}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        setStaffMembers(prevState => prevState.filter(member => member.name !== name));
      })
      .catch(error => console.error('Error deleting staff member:', error));
  };

  const handleDeleteClick = (name) => {
    setConfirmDelete({ show: true, name });
  };

  const handleConfirmDelete = () => {
    handleDelete(confirmDelete.name);
    setConfirmDelete({ show: false, name: '' });
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ show: false, name: '' });
  };

  return (
    <div className="staff-page">
      <div className="left-container">
        <h1>List of Staff Members</h1>
        <ul>
          {staffMembers.map((staff, index) => (
            <li key={index} className="staff-item">
              <span className="staff-name">{staff.name} - {staff.position}</span>
              {staff.photo && (
                <img 
                  src={`http://localhost:5000/uploads/${staff.photo}`} 
                  alt={`Profile of ${staff.name}`} 
                  className="staff-photo"
                  style={{ width: '80px', height: '100px' }} 
                />
              )}
              <button className="delete-button" onClick={() => handleDeleteClick(staff.name)}>Delete</button>
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
              className="name-input"
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
              className="position-input"
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
              className="browse-button"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Add Staff Member</button>
        </form>
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
      {confirmDelete.show && (
        <div className="popup">
          <div className="popup-inner">
            <p>Are you sure you want to delete {confirmDelete.name}?</p>
            <button className="confirm-button" onClick={handleConfirmDelete}>Yes</button>
            <button className="cancel-button" onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffPage;
