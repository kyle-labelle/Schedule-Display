import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SettingsPage = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'default');
  const [textSize, setTextSize] = useState(() => localStorage.getItem('textSize') || 'medium');
  const [dyslexicFont, setDyslexicFont] = useState(() => JSON.parse(localStorage.getItem('dyslexicFont')) || false);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = textSize;
    localStorage.setItem('textSize', textSize);
  }, [textSize]);

  useEffect(() => {
    if (dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
    localStorage.setItem('dyslexicFont', JSON.stringify(dyslexicFont));
  }, [dyslexicFont]);

  const handleThemeChange = (event) => setTheme(event.target.value);
  const handleTextSizeChange = (event) => setTextSize(event.target.value);
  const handleDyslexicFontChange = () => setDyslexicFont(!dyslexicFont);
  const handleBackClick = () => navigate('/');

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
        <div className="wide-grid-item">
          <label className="dropdown-label">
            Text Size
            <select value={textSize} onChange={handleTextSizeChange} className="dropdown">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
      </div>
      <button className="back-button" onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SettingsPage;
