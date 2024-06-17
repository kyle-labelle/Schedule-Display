import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StaffPage.css';

function StaffPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/MainPage');
  };

  return (
    <div className="staff-page">
      <div className="left-container">
        <h1>List of Staff Members</h1>
        
      </div>
      <div className="right-container">
        <h1>Add new Staff Member</h1>
        
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default StaffPage;
