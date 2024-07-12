import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DailyPage.css';

function DailyPage() {
  const { day } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/event')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);


  const handleBackClick = () => {
    navigate('/MainPage');
  };

  return (
    <div className="daily-page">
      <div className="left-container">
        <h1>{day}'s Schedule<br />(Events)</h1>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <span className="event-name">{event.name} - {event.description} - {event.datetime}</span>
            </li>
          ))}
        </ul>
        
      </div>
      <div className="right-container">
        <h1>Staff<br />(Names, Photos, Hours)</h1>
        
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default DailyPage;
