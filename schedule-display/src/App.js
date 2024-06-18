import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DailyPage from './DailyPage';
import MainPage from './MainPage';
import StaffPage from './StaffPage';
import HomePage from './HomePage';

function App() { //TODO: Uncomment and make this redirect from 'Open Calendar'
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/day/:day" element={<DailyPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </Router>
  );
}
export default App;
