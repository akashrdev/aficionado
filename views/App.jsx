import { useState } from 'react';
import './App.css';
import Reviews from './Components/Review.jsx';
import Home from './Components/Home.jsx';
import { AuthProvider } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
