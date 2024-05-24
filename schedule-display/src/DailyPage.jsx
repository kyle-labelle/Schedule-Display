import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DailyPage.css';

function DailyPage() {
  const { day } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="daily-page">
      <div className="left-container">
        <h1>{day}'s Schedule<br />(Events)</h1>
        
      </div>
      <div className="right-container">
        <h1>Staff<br />(Names, Photos, Hours)</h1>
        
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default DailyPage;
