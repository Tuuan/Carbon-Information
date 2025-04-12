import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import MapView from './components/MapView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
