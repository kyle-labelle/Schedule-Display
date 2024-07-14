import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './DailyPage.css';

function DailyPage() {
    const { day } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

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

    return (
        <div className="daily-page">
            <div className="left-container">
                <h1>{day}'s Schedule<br />(Events)</h1>
                <p>{date}</p>
                <ul>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <li key={index} className="event-item">
                                <span className="event-name">{event.name} - {event.description} - {new Date(event.datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            </li>
                        ))
                    ) : (
                        <li>No events for this date.</li>
                    )}
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
