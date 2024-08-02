import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './EventPage.css';
import './App.css';

function EventPage() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [dropdownValue, setDropdownValue] = useState('');
  const [shiftStartDate, setShiftStartDate] = useState(new Date());
  const [shiftStartTime, setShiftStartTime] = useState(new Date());
  const [shiftEndTime, setShiftEndTime] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/staff')
      .then(response => response.json())
      .then(data => setStaffMembers(data))
      .catch(error => console.error('Error fetching staff members:', error));
  }, []);

  const handleBackClick = () => {
    navigate('/MainPage');
  };

  const handleFormSubmit1 = (e) => {
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
        setEventName('');
        setEventDescription('');
        setEventDate(new Date());
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch(error => console.error('Error adding Event:', error));
  };

  const handleFormSubmit2 = (e) => {
    e.preventDefault();
    const shiftStart = new Date(
      shiftStartDate.getFullYear(),
      shiftStartDate.getMonth(),
      shiftStartDate.getDate(),
      shiftStartTime.getHours(),
      shiftStartTime.getMinutes(),
      shiftStartTime.getSeconds()
    );
    const shiftEnd = new Date(
      shiftStartDate.getFullYear(),
      shiftStartDate.getMonth(),
      shiftStartDate.getDate(),
      shiftEndTime.getHours(),
      shiftEndTime.getMinutes(),
      shiftEndTime.getSeconds()
    );

    if (shiftEnd <= shiftStart) {
      alert('Shift end time cannot be before or equal to shift start time.');
      return;
    }

    const formData = new FormData();
    formData.append('name', dropdownValue);
    formData.append('startDatetime', shiftStart.toISOString());
    formData.append('endDatetime', shiftEnd.toISOString());

    fetch('http://localhost:5000/shift', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setDropdownValue('');
        setShiftStartDate(new Date());
        setShiftStartTime(new Date());
        setShiftEndTime(new Date());
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch(error => console.error('Error adding Shift:', error));
  };

  const yesterday = Datetime.moment().subtract(1, 'day');
  const validEventDate = current => current.isAfter(yesterday);
  const validShiftStartDate = current => current.isAfter(yesterday);

  return (
    <div className="event-page">
      <div className="event-box">
        <h1>Create New Event</h1>
        <form className="event-form" onSubmit={handleFormSubmit1}>
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
              onChange={(date) => setEventDate(new Date(date))}
              inputProps={{ placeholder: 'Select Date and Time' }}
              isValidDate={validEventDate}
              required
            />
          </div>
          <button type="submit">Submit Event</button>
        </form>
      </div>
      <div className="event-box">
        <h1>Add Staff Shift</h1>
        <form className="event-form" onSubmit={handleFormSubmit2}>
          <div className="form-group">
            <label htmlFor="dropdown">Staff Member:</label>
            <select
              id="dropdown"
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              required
            >
              <option value="" disabled>Select a staff member</option>
              {staffMembers.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="shiftStartDate">Shift Date:</label>
            <Datetime
              value={shiftStartDate}
              onChange={(date) => setShiftStartDate(new Date(date))}
              timeFormat={false}
              inputProps={{ placeholder: 'Select Start Date' }}
              isValidDate={validShiftStartDate}
              required
            />
          </div>
          <div className="form-group-horizontal">
            <div className="form-group">
              <label htmlFor="shiftStartTime">Shift Start Time:</label>
              <Datetime
                value={shiftStartTime}
                onChange={(time) => setShiftStartTime(new Date(time))}
                dateFormat={false}
                inputProps={{ placeholder: 'Select Start Time' }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="shiftEndTime">Shift End Time:</label>
              <Datetime
                value={shiftEndTime}
                onChange={(time) => setShiftEndTime(new Date(time))}
                dateFormat={false}
                inputProps={{ placeholder: 'Select End Time' }}
                required
              />
            </div>
          </div>
          <button type="submit">Submit Shift</button>
        </form>
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
      {showPopup && (
        <div className="popup">
          Added new Event
        </div>
      )}
    </div>
  );
}

export default EventPage;
