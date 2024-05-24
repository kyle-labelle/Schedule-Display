import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function MainPage() {
    return (
      <div className="App">
        <header className="header">
          <button className="left-button">←</button>
          <h1 className="header-text">Week of:</h1>
          <button className="right-button">→</button>
        </header>
        <div className="grid-container">
          <Link to="/day/Sunday" className="grid-item">
            <span>Sunday</span>
          </Link>
          <Link to="/day/Monday" className="grid-item">
            <span>Monday</span>
          </Link>
          <Link to="/day/Tuesday" className="grid-item">
            <span>Tuesday</span>
          </Link>
          <Link to="/day/Wednesday" className="grid-item">
            <span>Wednesday</span>
          </Link>
          <Link to="/day/Thursday" className="grid-item">
            <span>Thursday</span>
          </Link>
          <Link to="/day/Friday" className="grid-item">
            <span>Friday</span>
          </Link>
          <Link to="/day/Saturday" className="grid-item">
            <span>Saturday</span>
          </Link>
          <Link to="/staff" className="grid-item">
            <span>Staff</span>
          </Link>
        </div>
      </div>
    );
  }

  export default MainPage;
