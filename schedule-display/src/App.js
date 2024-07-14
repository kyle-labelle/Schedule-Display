import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DailyPage from './DailyPage';
import MainPage from './MainPage';
import StaffPage from './StaffPage';
import HomePage from './HomePage';
import EventPage from './EventPage';
import SettingsPage from './SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/day/:day" element={<DailyPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
