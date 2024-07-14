import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function HomePage() {
    return (
      <div className="App">
        <header className="header">
        </header>
        <div className="wide-grid-container">
          <Link to="/MainPage" className="wide-grid-item">
            <span>Open Calendar</span>
          </Link>
          <Link to="/staff" className="wide-grid-item">
            <span>Staff Page</span>
          </Link>
          <Link to="/settings" className="wide-grid-item">
            <span>Settings</span>
          </Link>
        </div>
      </div>
    );
  }

  export default HomePage;
