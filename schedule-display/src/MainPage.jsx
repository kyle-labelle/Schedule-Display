import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//Helper function to get the week's range given a date
function getWeekRange(date) {
    const current = new Date(date);
    const first = current.getDate() - current.getDay(); //First day of the week (Sunday)
    const last = first + 6; //Last day of the week (Saturday)

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
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentFullDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });//State to track the current date for the week's range
    const [currentDate, setCurrentDate] = useState(new Date());

    //Calculate the current week's range based on the current date
    const week = getWeekRange(currentDate);

    //Function to handle moving to the previous week
    const handlePreviousWeek = () => {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
    };

    //Function to handle moving to the next week
    const handleNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    //Check if a given day in the current week matches the actual current date
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

    return (
        <div className="App">
            <header className="header">
                <button className="left-button" onClick={handlePreviousWeek}>←</button>
                <h1 className="header-text">Week of: {week.start} - {week.end}</h1>
                <button className="right-button" onClick={handleNextWeek}>→</button>
            </header>
            <div className="grid-container">
                {days.map((day, index) => (
                    <Link to={`/day/${day}`} className={`grid-item ${isCurrentDay(index) ? 'current-day' : ''}`} key={day}>
                        <span className="day-name">{day}</span>
                        <span className="date-number">{getDateNumber(index)}</span>
                    </Link>
                ))}
                <Link to="/staff" className="grid-item">
                    <span>Staff</span>
                </Link>
            </div>
            <footer className="footer">
                <h2>Today is: {currentFullDate}</h2>
            </footer>
        </div>
    );
}

export default MainPage;
