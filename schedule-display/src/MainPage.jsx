import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function MainPage() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

    return (
      <div className="App">
        <header className="header">
          <button className="left-button">←</button>
          <h1 className="header-text">Week of:</h1>
          <button className="right-button">→</button>
        </header>
        <div className="grid-container">
          {days.map((day) => ( //Cryptic and esoteric ChatGPT grid generator that is used to change the current day colour.
            <Link to={`/day/${day}`} className={`grid-item ${day === currentDay ? 'current-day' : ''}`} key={day}>
              <span>{day}</span>
            </Link>
          ))}
          <Link to="/staff" className="grid-item">
            <span>Staff</span>
          </Link>
        </div>
      </div>
    );
}

export default MainPage;
