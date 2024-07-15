import React, { useState, useEffect } from 'react';
import './App.css';

const SettingsPage = () => {
  const [colorblindMode, setColorblindMode] = useState(() => {
    return JSON.parse(localStorage.getItem('colorblindMode')) || false;
  });

  const [dyslexiaMode, setDyslexiaMode] = useState(() => {
    return JSON.parse(localStorage.getItem('dyslexiaMode')) || false;
  });

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

  const handleColorblindToggle = () => {
    setColorblindMode(!colorblindMode);
  };

  const handleDyslexiaToggle = () => {
    setDyslexiaMode(!dyslexiaMode);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-text">Settings</h1>
      </header>
      <div className="wide-grid-container">
        <div className="wide-grid-item">
          <label className="checkbox-label">
            <input type="checkbox" checked={colorblindMode} onChange={handleColorblindToggle} />
            <span className="custom-checkbox"></span>
            Colorblind Mode
          </label>
        </div>
        <div className="wide-grid-item">
          <label className="checkbox-label">
            <input type="checkbox" checked={dyslexiaMode} onChange={handleDyslexiaToggle} />
            <span className="custom-checkbox"></span>
            Dyslexia Mode
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
