import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './DailyPage.css';

function DailyPage() {
    const { day } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [events, setEvents] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [staffMembers, setStaffMembers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/event')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/shift')
            .then(response => response.json())
            .then(data => setShifts(data))
            .catch(error => console.error('Error fetching shifts:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/staff')
            .then(response => response.json())
            .then(data => setStaffMembers(data))
            .catch(error => console.error('Error fetching staff members:', error));
    }, []);

    const handleBackClick = () => {
        navigate('/MainPage');
    };

    // Retrieve the passed date from location state
    const date = location.state?.date ? new Date(location.state.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
    const formattedDate = location.state?.date ? new Date(location.state.date).toDateString() : '';

    // Filter and sort events based on the passed date and time
    const filteredEvents = events
        .filter(event => {
            const eventDate = new Date(event.datetime).toDateString();
            return eventDate === formattedDate;
        })
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // Filter and sort shifts based on the passed date and time
    const filteredShifts = shifts
        .filter(shift => {
            const shiftDate = new Date(shift.startDatetime).toDateString();
            return shiftDate === formattedDate;
        })
        .sort((a, b) => new Date(a.startDatetime) - new Date(b.startDatetime));

    // Combine shift data with staff member data
    const enrichedShifts = filteredShifts.map(shift => {
        const staff = staffMembers.find(member => member.name === shift.name);
        return {
            ...shift,
            position: staff ? staff.position : '',
            photo: staff ? staff.photo : ''
        };
    });

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
