import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import './DailyPage.css';

// Import images
import bear from './assets/bear.png';
import cat from './assets/cat.png';
import elephant from './assets/elephant.png';
import lamb from './assets/lamb.webp';
import goat from './assets/goat.webp';
import puppy from './assets/puppy.png';
import teddy from './assets/teddy.png';

function DailyPage() {
    const { day } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [events, setEvents] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [staffMembers, setStaffMembers] = useState([]);
    const [randomImage, setRandomImage] = useState(null);

    // Array of image imports
    const images = [bear, cat, elephant, lamb, goat, puppy, teddy];

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

    useEffect(() => {
        // Select a random image from the array
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    }, []);

    useEffect(() => {
        // Select a random image from the array
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
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
                <h1>{day}'s Schedule</h1>
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
                {randomImage && (
                    <img src={randomImage} alt="Random animal" className="random-image" />
                )}
                {randomImage && (
                    <img src={randomImage} alt="Random animal" className="random-image" />
                )}
            </div>
            <div className="right-container">
                <h1>Staff Worker Shifts</h1>
                <ul>
                    {enrichedShifts.length > 0 ? (
                        enrichedShifts.map((shift, index) => (
                            <li key={index} className="shift-item">
                                {shift.photo && (
                                    <img 
                                        src={`http://localhost:5000/uploads/${shift.photo}`} 
                                        alt={`Profile of ${shift.name}`} 
                                        className="staff-photo"
                                        style={{ width: '80px', height: '100px' }} 
                                    />
                                )}
                                <span className="shift-name">{shift.name}</span>
                                <span className="shift-time">
                                    {new Date(shift.startDatetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                    {new Date(shift.endDatetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li>No shifts for this date.</li>
                    )}
                </ul>
            </div>
            <button className="back-button" onClick={handleBackClick}>Back</button>
        </div>
    );
}

export default DailyPage;

