import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SettingsPage = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-text">Settings</h1>
      </header>
      <div className="wide-grid-container">
        <div className="wide-grid-item">
          <label className="dropdown-label">
            Color/Color Blindness Themes
            <select value={theme} onChange={handleThemeChange} className="dropdown">
              <option value="default">Default</option>
              <option value="red-theme">Red Theme</option>
              <option value="protanopia">Protanopia</option>
              <option value="deuteranopia">Deuteranopia</option>
              <option value="tritanopia">Tritanopia</option>
            </select>
          </label>
        </div>
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SettingsPage;
