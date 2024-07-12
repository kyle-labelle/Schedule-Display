import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './EventPage.css';

function EventPage() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ name: '', description: '', datetime: null });

  const handleBackClick = () => {
    navigate('/MainPage');
  };

  const handleSubmitClick = () => {
    console.log('Event submitted:', {
      name: eventName,
      description: eventDescription,
      date: eventDate,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('description', eventDescription);
    formData.append('datetime', eventDate);

    fetch('http://localhost:5000/event', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setNewEvent({ name: '', description: '', datetime: null });
      })
      .catch(error => console.error('Error adding Event:', error));
  };

  return (
    <div className="event-page">
      <div className="container">
        <h1>Create New Event</h1>
        <form className="event-form">
          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDescription">Event Description:</label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Event Date:</label>
            <Datetime
              value={eventDate}
              onChange={(date) => setEventDate(date)}
              inputProps={{ placeholder: 'Select Date and Time' }}
              required
            />
          </div>
          <button type="button" onClick={handleFormSubmit}>Submit Event</button>
        </form>
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default EventPage;
