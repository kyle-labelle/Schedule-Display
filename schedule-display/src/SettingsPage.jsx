import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SettingsPage = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (colorblindMode) {
      document.documentElement.classList.add('colorblind-friendly');
    } else {
      document.documentElement.classList.remove('colorblind-friendly');
    }
    localStorage.setItem('colorblindMode', JSON.stringify(colorblindMode));
  }, [colorblindMode]);

  useEffect(() => {
    if (dyslexiaMode) {
      document.documentElement.classList.add('dyslexia-friendly');
    } else {
      document.documentElement.classList.remove('dyslexia-friendly');
    }
    localStorage.setItem('dyslexiaMode', JSON.stringify(dyslexiaMode));
  }, [dyslexiaMode]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="App">
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
