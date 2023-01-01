import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import City from './pages/City';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <div className='contentContainer'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:idCity" element={<City />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
