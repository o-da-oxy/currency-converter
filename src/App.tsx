import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Converter from './components/converter/Converter';
import History from './components/history/History';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Converter />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
