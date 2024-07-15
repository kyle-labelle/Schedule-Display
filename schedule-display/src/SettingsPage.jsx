// SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SettingsPage = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });

  const [colorblindMode, setColorblindMode] = useState(() => {
    return JSON.parse(localStorage.getItem('colorblindMode')) || false;
  });

  const [dyslexiaMode, setDyslexiaMode] = useState(() => {
    return JSON.parse(localStorage.getItem('dyslexiaMode')) || false;
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'medium';
  });

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

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

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `var(--font-size-${fontSize})`);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleColorblindToggle = () => {
    setColorblindMode(!colorblindMode);
  };

  const handleDyslexiaToggle = () => {
    setDyslexiaMode(!dyslexiaMode);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  return (
    <div className="App">
      <div className="settings-page">
      <h1 className="settings-header-text">Settings</h1>

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
          <label className="checkbox-label">
            <input type="checkbox" checked={dyslexiaMode} onChange={handleDyslexiaToggle} />
            <span className="custom-checkbox"></span>
            Dyslexia Mode
          </label>
        </div>
        <div className="wide-grid-item">
          <label className="dropdown-label">
            Font Size
            <select value={fontSize} onChange={handleFontSizeChange} className="dropdown">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
        <button className="settings-back-button" onClick={handleBackClick}>Back</button>
      </div>
      </div>
    </div>
  );
};

export default SettingsPage;
