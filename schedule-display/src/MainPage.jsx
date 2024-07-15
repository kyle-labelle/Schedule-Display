import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

// Helper function to get the week's range given a date
function getWeekRange(date) {
    const current = new Date(date);
    const first = current.getDate() - current.getDay(); // First day of the week (Sunday)
    const last = first + 6; // Last day of the week (Saturday)

    const firstDay = new Date(current.setDate(first));
    const lastDay = new Date(current.setDate(last));

    return {
        start: firstDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        end: lastDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        firstDay,
        lastDay
    };
}

function MainPage() {
    const navigate = useNavigate();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentFullDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    // Calculate the current week's range based on the current date
    const week = getWeekRange(currentDate);

    const handlePreviousWeek = () => {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const isCurrentDay = (dayIndex) => {
        const dayDate = new Date(week.firstDay);
        dayDate.setDate(week.firstDay.getDate() + dayIndex);
        return dayDate.toDateString() === today.toDateString();
    };

    const getDateNumber = (dayIndex) => {
        const dayDate = new Date(week.firstDay);
        dayDate.setDate(week.firstDay.getDate() + dayIndex);
        return dayDate.getDate();
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const handleEventPageClick = () => {
        setShowPasswordPrompt(true);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        const correctPassword = 'test';
        if (password === correctPassword) {
            navigate('/event');
        } else {
            setIsPasswordValid(false);
        }
    };

    const handleClosePopup = () => {
        setShowPasswordPrompt(false);
        setPassword('');
        setIsPasswordValid(true);
    };

    return (
        <div className="App">
            <header className="header">
                <button className="left-button" onClick={handlePreviousWeek}>←</button>
                <h1 className="header-text">Week of: {week.start} - {week.end}</h1>
                <button className="right-button" onClick={handleNextWeek}>→</button>
            </header>
            <div className="grid-container">
                {days.map((day, index) => {
                    const dayDate = new Date(week.firstDay);
                    dayDate.setDate(week.firstDay.getDate() + index);
                    return (
                        <Link
                            to={`/day/${day}`}
                            state={{ date: dayDate.toISOString() }}
                            className={`grid-item ${isCurrentDay(index) ? 'current-day' : ''}`}
                            key={day}
                        >
                            <span className="day-name">{day}</span>
                            <span className="date-number">{getDateNumber(index)}</span>
                        </Link>
                    );
                })}
                <div className="grid-item" onClick={handleEventPageClick}>
                    <span>Create<br/>Event</span>
                </div>
            </div>
            {showPasswordPrompt && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-button" onClick={handleClosePopup}>×</button>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter password"
                        />
                        <button onClick={handlePasswordSubmit}>Submit</button>
                        {!isPasswordValid && <p>Incorrect password. Please try again.</p>}
                    </div>
                </div>
            )}
            <footer className="footer">
                <h2>Today is: {currentFullDate}</h2>
                <button className="back-button" onClick={handleBackClick}>Back</button>
            </footer>
        </div>
    );
}

export default MainPage;
