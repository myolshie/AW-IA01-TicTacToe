import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoList from './components/photoList';
import PhotoDetail from './components/photoDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/photos" />} />
        <Route path="/photos" element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
