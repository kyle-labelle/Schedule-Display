import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function HomePage() {
    return (
      <div className="App">
        <header className="header">
        </header>
        <div className="grid-container">
          <Link to="/MainPage" className="grid-item">
            <span>Open Calendar</span>
          </Link>
          <Link to="/Tutorial" className="grid-item">
            <span>Tutorial</span>
          </Link>
          <Link to="/SoftwareInfo" className="grid-item">
            <span>Software Information</span>
          </Link>
        </div>
      </div>
    );
  }

  export default HomePage;
